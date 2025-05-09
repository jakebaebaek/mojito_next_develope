import connectDB from "@/lib/db";
import { Member } from "@/lib/schemas/member";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request: Request) {
  try {
    connectDB();

    const { nickname } = await request.json();
    if (!nickname) {
      return NextResponse.json(
        { error: "닉네임이 전달되지 않았습니다." },
        { status: 400 }
      );
    }
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

    const updatedUser = await Member.findOneAndUpdate(
      { _id: userId },
      { $set: { nickname } },
      { new: true }
    );
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("nickname POST 에러", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
