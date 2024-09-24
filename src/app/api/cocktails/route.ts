import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { Cocktails } from "@/lib/schemas/cocktails";

export async function GET(request: Request) {
  try {
    connectDB();

    const cocktails = await Cocktails.find().lean();
    return Response.json(cocktails);
  } catch (error) {
    return Response.json(error);
  }
}
