import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, getUserById } from "../../../lib/authStore";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }
    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
    const user = getUserById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: { id: user.id, userName: user.userName, email: user.email } }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}