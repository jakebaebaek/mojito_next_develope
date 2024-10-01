import connectDB from "@/lib/db";
import { Emoji } from "@/lib/schemas/emoji";

export async function GET(request: Request) {
  try {
    connectDB();

    const emojis = await Emoji.find().lean();
    return Response.json(emojis);
  } catch (error) {
    return Response.json(error);
  }
}
Emoji;
