import MypageClient from "./MypageClient";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Mypage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          잘못된 접근 방식입니다. 로그인 후 이용해주세요.
        </h1>
      </div>
    );
  }

  return (
    <>
      <MypageClient />
    </>
  );
}
