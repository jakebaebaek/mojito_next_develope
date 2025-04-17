import connectDB from "@/lib/db";
import { Member, MemberStore } from "@/lib/schemas/member";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request: Request) {
  try {
    connectDB();
    const heartList = await request.json();
    console.log("heartList", heartList);
    const reqHeaders = headers();
    const cookie = reqHeaders.get("cookie") || "";
    const req = new NextRequest("http://localhost", { headers: { cookie } });

    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { error: "유저 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    const userId = token.id;

    const updateMemberStore = await MemberStore.findOneAndUpdate(
      { userId: userId },
      { $set: { heart: heartList } },
      { new: true }
    );
    // console.log("👑", updateMemberStore);
    return NextResponse.json(updateMemberStore);
  } catch (error) {
    console.error("heart POST 에러", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
