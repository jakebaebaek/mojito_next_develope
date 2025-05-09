import connectDB from "@/lib/db";
import { Member, MemberStore } from "@/lib/schemas/member";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST() {
  try {
    connectDB();
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

    const member_list_delete = await Member.findOneAndDelete(
      { _id: userId }
    );
    const member_stores_delete = await MemberStore.findOneAndDelete(
      {userId: userId}
    );
    return NextResponse.json({
      deletedMember: member_list_delete,
      deletedMemberStore: member_stores_delete,
    });
  } catch (error) {
    console.error("계정 삭제 POST 에러", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
