import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/Player";

// GET Player by ID
export async function GET(request, context) {
  try {
    const { params } = context;
    await connectDB();

    const player = await Player.findById(params.id);
    if (!player)
      return NextResponse.json({ success: false, message: "Player not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    console.error("GET /players/[id] error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT / Update Player by ID
export async function PUT(request, context) {
  try {
    const { params } = context;
    await connectDB();

    let data = {};
    try {
      const text = await request.text();
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }

    const player = await Player.findByIdAndUpdate(params.id, data, { new: true });
    if (!player)
      return NextResponse.json({ success: false, message: "Player not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    console.error("PUT /players/[id] error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE Player by ID
export async function DELETE(request, context) {
  try {
    const { params } = context;
    await connectDB();

    const player = await Player.findByIdAndDelete(params.id);
    if (!player)
      return NextResponse.json({ success: false, message: "Player not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Player deleted" });
  } catch (error) {
    console.error("DELETE /players/[id] error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
