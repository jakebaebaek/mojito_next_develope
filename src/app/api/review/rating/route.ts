import connectDB from "@/lib/db";
import { MemberStore } from "@/lib/schemas/member";
import { NextResponse, NextRequest  } from 'next/server';
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { TMemberStore } from "@/lib/types/TMemberStore";



export async function POST(request: Request) {
  try {
    connectDB();
    const body = await request.json();
    const { rating, cocktailId } = body;
    console.log("request 값입니다.",body);

    // getToken 사전준비 header에서 cookie 가져오기
    const reqHeaders = headers();
    const cookie = reqHeaders.get("cookie") || "";

    // NextRequest 객체 생성
    const req = new NextRequest("http://localhost", { headers: { cookie } });

    // `getToken()`을 사용하여 JWT 토큰 데이터 가져오기
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    console.log("🔑 서버 컴포넌트에서 가져온 토큰:", token);

    if (!token) {
      return NextResponse.json({ error: "유저 정보를 찾을 수 없습니다." }, { status: 404 });
    }
    const userId = token.id;

    //칵테일 리뷰 업데이트
    const updatedUser = await MemberStore.findOneAndUpdate(
      { userId, "memo.cocktail_id": cocktailId },
      {
        $set: {"memo.$.rating": rating},
        "memo.$.updatedAt": new Date(),
      },
      {
        new: true, // 업데이트 후 문서 반환
      }
    );
    console.log("리뷰 업데이트 결과:", updatedUser);
    // 만약 해당 리뷰가 없다면 새로 추가
    let latestReview;
    
    if (!updatedUser) {
      const addedUser = await MemberStore.findOneAndUpdate(
        { userId },
        {
          $push: {
            memo: {
              cocktail_id: cocktailId,
              rating: rating,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          new: true,
        }
      );
      console.log("리뷰가 없어서 추가했습니다.", addedUser);
      latestReview = addedUser.memo.find((item: TMemberStore['memo'][number]) => item.cocktail_id.toString() === cocktailId);
    } else {
      latestReview = updatedUser.memo.find((item:TMemberStore['memo'][number]) => item.cocktail_id.toString() === cocktailId);
    }
    console.log("최신 리뷰:", latestReview);
  return NextResponse.json({
      message: "성공적으로 별점이 업데이트 되었습니다.",
      memo: latestReview || null,
    });
  } catch (error) {
    console.error("❌POST요청 처리 중 에러 발생:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    connectDB();
    const { searchParams } = new URL(request.url);
    const cocktailId = searchParams.get("cocktailId");
    console.log("✅ 쿼리로 받은 cocktailId:", cocktailId);

    if (!cocktailId) {
      return NextResponse.json({ error: "cocktailId가 없습니다." }, { status: 400 });
    }
    // cookie 에서 JWT 추출
    const reqHeaders = headers();
    const cookie = reqHeaders.get("cookie") || "";
    const req = new NextRequest("http://localhost", { headers: { cookie } });

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    console.log("🔑 서버 컴포넌트에서 가져온 토큰:", token);

    if (!token) {
      return NextResponse.json({ error: "유저 정보를 찾을 수 없습니다." }, { status: 404 });
    }
    const userId = token.id;

    // DB에서 리뷰 찾기
    const getUserReview = await MemberStore.findOne(
      { userId }, // 유저 조건
      {
        memo: { $elemMatch: { cocktail_id: cocktailId } }, // 배열 안 특정 조건 요소만 추출
      }
    );
    return Response.json(getUserReview);
  } catch (error) {
    console.error("❌rating GET요청 처리 중 에러 발생:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}