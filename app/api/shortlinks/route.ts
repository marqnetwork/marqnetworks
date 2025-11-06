import { NextResponse } from "next/server";
import {
  ensureShortlinksFile,
  getShortLink,
  makeCode,
  upsertShortLink,
  readShortlinks,
} from "../../lib/shortlinkStore";

function sanitizeAlias(alias: string) {
  return alias.replace(/[^a-zA-Z0-9-_]/g, "");
}

export async function GET() {
  try {
    const data = readShortlinks();
    return NextResponse.json({ count: Object.keys(data.links).length }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    ensureShortlinksFile();
    const body = await req.json();
    const url = (body?.url || "").trim();
    let alias = (body?.alias || "").trim();

    if (!url) {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }
    try {
      // Validate URL
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (alias) {
      alias = sanitizeAlias(alias);
      if (!alias) {
        return NextResponse.json({ error: "Alias contains no valid characters" }, { status: 400 });
      }
      const taken = getShortLink(alias);
      if (taken) {
        return NextResponse.json({ error: "Alias already taken" }, { status: 409 });
      }
    }

    const code = alias || makeCode(6);
    const link = {
      code,
      original: url,
      createdAt: Date.now(),
      clicks: 0,
    };
    upsertShortLink(link);

    return NextResponse.json({ ok: true, code }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to create" }, { status: 500 });
  }
}