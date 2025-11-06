import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ensureDataDirs } from "../../lib/attendanceStore";

export async function POST(req: Request) {
  try {
    ensureDataDirs();
    const form = await req.formData();
    const userName = (form.get('userName') as string) || '';
    const file = form.get('snapshot') as File | null;
    if (!userName.trim()) {
      return NextResponse.json({ error: 'userName is required' }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ error: 'snapshot file is required' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const safeName = userName.replace(/[^a-z0-9\-_]/gi, '_');
    const filename = `${Date.now()}-${safeName}.png`;
    const dest = path.join(uploadsDir, filename);
    fs.writeFileSync(dest, buffer);
    return NextResponse.json({ ok: true, url: `/uploads/${filename}` }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}