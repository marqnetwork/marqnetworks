import crypto from "crypto";

function base64url(input: Buffer | string) {
  const buff = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buff
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function signHS256(payload: Record<string, any>, secret: string, expiresInSeconds: number) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac("sha256", secret).update(data).digest();
  const encodedSig = base64url(signature);
  return `${data}.${encodedSig}`;
}

export function verifyHS256(token: string, secret: string): { valid: boolean; payload?: any; error?: string } {
  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false, error: "Malformed token" };
  const [h, p, s] = parts;
  const data = `${h}.${p}`;
  const expected = base64url(crypto.createHmac("sha256", secret).update(data).digest());
  if (expected !== s) return { valid: false, error: "Signature mismatch" };
  try {
    const payload = JSON.parse(Buffer.from(p, "base64").toString("utf-8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return { valid: false, error: "Expired" };
    return { valid: true, payload };
  } catch (e: any) {
    return { valid: false, error: e.message };
  }
}