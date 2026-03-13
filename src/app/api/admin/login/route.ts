// src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const apiKey = process.env.ADMIN_API_KEY;

    if (!validUsername || !validPassword || !apiKey) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true, apiKey });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}