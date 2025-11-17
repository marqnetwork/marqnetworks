import tls from "tls";
import nodemailer from "nodemailer";

export async function sendViaSMTP(to: string, subject: string, html: string, text: string) {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const from = process.env.SMTP_FROM || process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "";
  const ehlo = process.env.SMTP_EHLO_DOMAIN || "localhost";
  if (!host || !port || !user || !pass || !from) return { ok: false, error: "missing_config" };
  const msg = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    "",
    html || text || "",
    "",
  ].join("\r\n");
  return new Promise<{ ok: boolean; error?: string }>((resolve) => {
    let buf = "";
    const socket = tls.connect({ host, port, rejectUnauthorized: false }, () => {});
    function write(cmd: string) { socket.write(cmd + "\r\n"); }
    function read(expect: string[]) {
      return new Promise<void>((r, j) => {
        const handler = (chunk: Buffer) => {
          buf += chunk.toString("utf8");
          const lines = buf.split(/\r?\n/).filter(Boolean);
          const ok = expect.some((code) => lines.some((ln) => ln.startsWith(code + " ") || ln.startsWith(code + "-")));
          if (ok) {
            socket.off("data", handler);
            buf = "";
            r();
          }
        };
        socket.on("data", handler);
        socket.on("error", (e) => { socket.destroy(); j(e); });
      });
    }
    (async () => {
      try {
        await read(["220"]);
        write(`EHLO ${ehlo}`);
        await read(["250"]);
        write("AUTH LOGIN");
        await read(["334"]);
        write(Buffer.from(user).toString("base64"));
        await read(["334"]);
        write(Buffer.from(pass).toString("base64"));
        await read(["235"]);
        write(`MAIL FROM:<${from}>`);
        await read(["250"]);
        write(`RCPT TO:<${to}>`);
        await read(["250", "251"]);
        write("DATA");
        await read(["354"]);
        socket.write(msg + "\r\n.\r\n");
        await read(["250"]);
        write("QUIT");
        resolve({ ok: true });
        socket.end();
      } catch (e: any) {
        resolve({ ok: false, error: (e?.message || "smtp_failed") + (buf ? ` | ${buf}` : "") });
        try { socket.end(); } catch {}
      }
    })();
  });
}

export async function sendEmail(to: string, subject: string, html: string, text: string = "") {
  const sgKey = process.env.SENDGRID_API_KEY || "";
  const sgFrom = process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "";
  const rsKey = process.env.RESEND_API_KEY || "";
  const rsFrom = process.env.RESEND_FROM_EMAIL || "";
  const smtpReady = process.env.SMTP_HOST && (process.env.SMTP_USER || process.env.SMTP_PASS);
  const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "";

  if (smtpReady) {
    try {
      const port465 = Number(process.env.SMTP_PORT || 465) === 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: port465,
        auth: { user: process.env.SMTP_USER || "", pass: process.env.SMTP_PASS || "" },
        name: process.env.SMTP_EHLO_DOMAIN || undefined,
        tls: { rejectUnauthorized: false },
        authMethod: 'LOGIN',
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
      } as any);
      await transporter.sendMail({ from: smtpFrom, to, subject, text: text || undefined, html: html || undefined });
      return { ok: true };
    } catch (e: any) {
      try {
        const transporter587 = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: 587,
          secure: false,
          requireTLS: true,
          auth: { user: process.env.SMTP_USER || "", pass: process.env.SMTP_PASS || "" },
          name: process.env.SMTP_EHLO_DOMAIN || undefined,
          tls: { rejectUnauthorized: false },
          authMethod: 'LOGIN',
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
        } as any);
        await transporter587.sendMail({ from: smtpFrom, to, subject, text: text || undefined, html: html || undefined });
        return { ok: true };
      } catch (e2: any) {
        const raw = await sendViaSMTP(to, subject, html, text);
        if (raw.ok) return raw;
        return { ok: false, error: (e2?.message || e?.message || "smtp_failed") };
      }
    }
  }

  if (sgKey && sgFrom) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sgKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: sgFrom },
        subject,
        content: [
          ...(text ? [{ type: "text/plain", value: text }] : []),
          { type: "text/html", value: html || "" },
        ],
      }),
    });
    if (!res.ok) return { ok: false, error: await res.text() };
    return { ok: true };
  }

  if (rsKey && rsFrom) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: rsFrom, to, subject, html, text }),
    });
    if (!res.ok) return { ok: false, error: await res.text() };
    return { ok: true };
  }

  return { ok: false, error: "missing_config" };
}