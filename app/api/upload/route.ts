import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSupabaseAdminClient } from '../../lib/supabase';

function ensureUploads() {
  const dir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = (form.get('file') || form.get('snapshot')) as File | null;
    if (!file) return NextResponse.json({ ok: false, error: 'file_required' }, { status: 400 });
    const userName = String(form.get('userName') || 'Unknown').trim() || 'Unknown';
    const buf = Buffer.from(await file.arrayBuffer());

    let supabase: ReturnType<typeof getSupabaseAdminClient> | null = null;
    try { supabase = getSupabaseAdminClient(); } catch { supabase = null; }

    if (supabase) {
      const bucket = 'screenshots';
      try { await (supabase as any).storage.createBucket(bucket, { public: true }); } catch {}
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const ext = (file.type.split('/').pop() || 'png');
      const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const key = `${userName}/${ymd}/${id}.${ext}`;
      const { error } = await (supabase as any).storage.from(bucket).upload(key, buf, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data } = (supabase as any).storage.from(bucket).getPublicUrl(key);
      return NextResponse.json({ ok: true, url: data.publicUrl });
    }

    const dir = ensureUploads();
    const name = (file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = name.includes('.') ? name.split('.').pop() as string : (file.type.split('/').pop() || 'bin');
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const filename = `${id}.${ext}`;
    const abs = path.join(dir, filename);
    fs.writeFileSync(abs, buf);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'upload_failed' }, { status: 500 });
  }
}