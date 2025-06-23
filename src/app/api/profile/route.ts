import connectDB from "@/lib/db";
import { Member } from "@/lib/schemas/member";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request: Request) {
  try {
    connectDB();

    const { nickname, profileImage } = await request.json();
    console.log("💢💌💢💢💢💢💢닉네임 POST 요청 데이터:", { nickname, profileImage });
    if (!nickname || profileImage === undefined) {
      return NextResponse.json(
        { error: "프로필 데이터가 전달되지 않았습니다." },
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
      { $set: { nickname, profileImage } },
      { new: true }
    );
    console.log("💢💌💢💢💢💢💢닉네임 업데이트 결과:", updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("nickname POST 에러", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  try {
    connectDB();

    const reqHeaders = headers();
    const cookie = reqHeaders.get("cookie") || "";
    const req = new NextRequest("http://localhost", { headers: { cookie } });
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }

    const user = await Member.findById(token.id);
    if (!user) {
      return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
    }

    return NextResponse.json({
      nickname: user.nickname,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("GET /api/profile 에러:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}