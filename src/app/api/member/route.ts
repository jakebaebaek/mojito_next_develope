import connectDB from "@/lib/db";
import { Member } from "@/lib/schemas/member";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  try {
    connectDB();
    const heartList = await request.json();
    console.log("🍀", heartList);

    const reqHeaders = headers();
    const cookie = reqHeaders.get("cookie") || "";

    const req = new NextRequest("http://localhost", { headers: { cookie } });

    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    console.log("JSON Web Token", token);
    console.log("🦄", token);

    return;
  } catch (error) {
    console.error("heart POST 에러", error);
  }
}
