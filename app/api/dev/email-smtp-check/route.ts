import { NextResponse } from 'next/server';
import tls from 'tls';

export async function GET() {
  const host = process.env.SMTP_HOST || '';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const ehlo = process.env.SMTP_EHLO_DOMAIN || 'localhost';
  if (!host || !port || !user || !pass) return NextResponse.json({ ok: false, error: 'missing_config' }, { status: 400 });
  let log: string[] = [];
  let buf = '';
  function read(socket: tls.TLSSocket, expect: string[]) {
    return new Promise<void>((resolve, reject) => {
      const handler = (chunk: Buffer) => {
        buf += chunk.toString('utf8');
        const lines = buf.split(/\r?\n/).filter(Boolean);
        log.push(...lines);
        const ok = expect.some(code => lines.some(ln => ln.startsWith(code + ' ') || ln.startsWith(code + '-')));
        if (ok) { socket.off('data', handler); buf = ''; resolve(); }
      };
      socket.on('data', handler);
      socket.on('error', (e) => { socket.destroy(); reject(e); });
    });
  }
  function write(socket: tls.TLSSocket, cmd: string) { socket.write(cmd + '\r\n'); }
  try {
    const socket = tls.connect({ host, port, rejectUnauthorized: false });
    await read(socket, ['220']);
    write(socket, `EHLO ${ehlo}`);
    await read(socket, ['250']);
    write(socket, 'AUTH LOGIN');
    await read(socket, ['334']);
    write(socket, Buffer.from(user).toString('base64'));
    await read(socket, ['334']);
    write(socket, Buffer.from(pass).toString('base64'));
    await read(socket, ['235']);
    write(socket, 'QUIT');
    socket.end();
    return NextResponse.json({ ok: true, steps: ['connected', 'ehlo', 'auth_login', 'auth_user', 'auth_pass', 'authenticated'], server_log: log.slice(-10) });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'smtp_failed', server_log: log.slice(-10) }, { status: 500 });
  }
}