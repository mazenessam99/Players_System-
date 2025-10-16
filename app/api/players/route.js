import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/Player";

export async function GET() {
  await connectDB();
  const players = await Player.find();
  return NextResponse.json({ success: true, data: players });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const player = await Player.create(body);
  return NextResponse.json({ success: true, data: player });
}
