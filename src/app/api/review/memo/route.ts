import connectDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { Member, MemberStore } from "@/lib/schemas/member";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const sessions = await getServerSession();
  console.log("getServerSession 값이 잘 나옵니까?",sessions);
  try {
    connectDB();
    const body = await req.json();
    const reviewText = body.reviewText;
    console.log("")
    console.log("request 값입니다.",body);
    if (!sessions) {
      return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });
    }
    const memberListsCollection = await Member.findOne({ email : sessions.user.email });  
    const user= await MemberStore.findOne({ userId : memberListsCollection._id });
    console.log("💙💙💙💙💚💛memberStoresCollection 값이 잘 나옵니까?",user);

    // 해당 userId의 MemberStore 문서가 있는지 확인
    const userId = user.userId;
    if (!user) {
      return NextResponse.json({ error: "유저 정보를 찾을 수 없습니다." }, { status: 404 });
    }

    // ✅ 해당 유저의 특정 칵테일 리뷰 업데이트
    const updatedUserStore = await MemberStore.updateOne(
      { userId, "memo.cocktail_id": body.cocktailId },
      {
        $set: {
          ...(reviewText && { "memo.$.memo_txt": reviewText }),
        },
      }
    );
    if (updatedUserStore.modifiedCount === 0) {
      await MemberStore.updateOne(
        { userId }, // userId가 일치하는 문서를 찾음
        {
          $push: {
            memo: {
              cocktail_id: body.cocktailId,
              memo_txt: reviewText,
            },
          },
        }
      );
    }    
    return Response.json({ message: "성공적으로 리뷰가 업데이트 되었습니다" });
  } catch (error) {
    console.error("❌ 요청 처리 중 에러 발생:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}