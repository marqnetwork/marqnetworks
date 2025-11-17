import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function ensureUploads() {
  const dir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ ok: false, error: 'file_required' }, { status: 400 });
    const dir = ensureUploads();
    const name = (file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = name.includes('.') ? name.split('.').pop() as string : (file.type.split('/').pop() || 'bin');
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const filename = `${id}.${ext}`;
    const abs = path.join(dir, filename);
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(abs, buf);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'upload_failed' }, { status: 500 });
  }
}