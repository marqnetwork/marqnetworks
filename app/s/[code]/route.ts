import { NextResponse } from "next/server";
import { getShortLink, incrementClicks } from "../../lib/shortlinkStore";

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    const link = getShortLink(code);
    if (!link) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 }
      );
    }
    incrementClicks(code);
    return NextResponse.redirect(link.original, { status: 302 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}