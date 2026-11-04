import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const expected = process.env.ADMIN_PASSWORD || "sheva2026";

    if (!body.password || body.password.trim() !== expected) {
      return NextResponse.json(
        { ok: false, error: "Password admin tidak sesuai." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      token: expected,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Format request tidak valid." },
      { status: 400 }
    );
  }
}

