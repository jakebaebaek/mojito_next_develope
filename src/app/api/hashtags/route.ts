import connectDB from "@/lib/db";
import { Hashtags } from "@/lib/schemas/hashtags";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    connectDB();

    const hashtags = await Hashtags.find().lean();
    return NextResponse.json(hashtags);
  } catch (error) {
    return NextResponse.json(error);
  }
}
