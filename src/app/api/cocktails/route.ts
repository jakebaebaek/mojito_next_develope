import connectDB from "@/lib/db";
import { Cocktails } from "@/lib/schemas/cocktails";
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "25", 10); 
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // 총 개수 가져오기
    const totalCount = await Cocktails.countDocuments();
    const baseResult = await Cocktails.aggregate([
        { $unwind: "$base" },
        { $group: { _id: null, uniqueBases: { $addToSet: "$base" } } },
        { $project: { _id: 0, uniqueBases: 1 } },
      ]);    
    const flavorResult = await Cocktails.aggregate([
    { $unwind: "$flavor" },
    { $group: { _id: null, uniqueFlavors: { $addToSet: "$flavor" } } },
    { $project: { _id: 0, uniqueFlavors: 1 } },
  ]);
    // 데이터베이스에서 offset과 limit을 적용하여 데이터 가져오기
    const cocktails = await Cocktails.find().skip(offset).limit(limit).lean();

    return NextResponse.json({
      cocktails,
      totalCount,
      uniqueBases: baseResult[0],
      uniqueFlavors: flavorResult[0],
    }); 
  } catch (error) {
    console.error("서버에서 칵테일 데이터를 가져오지 못했습니다.", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
