import connectDB from "@/lib/db";
import { Emoji } from "@/lib/schemas/emoji";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    connectDB();

    const emojis = await Emoji.find().lean();
    return NextResponse.json(emojis);
  } catch (error) {
    return NextResponse.json(error);
  }
}
