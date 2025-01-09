import connectDB from "@/lib/db";
import { Cocktails } from "@/lib/schemas/cocktails";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    connectDB();

    const cocktails = await Cocktails.find().lean();
    return NextResponse.json(cocktails);
  } catch (error) {
    return NextResponse.json(error);
  }
}
