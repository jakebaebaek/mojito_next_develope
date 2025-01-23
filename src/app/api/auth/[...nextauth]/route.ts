import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import connectDB from "@/lib/db";
import { Member } from "@/lib/schemas/member";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    // 카카오 Provider
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.test = "test";
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
    async signIn({ user, account }) {
      if (account && user.name && user.email) {
        const { name, email } = user;
        const { provider } = account;

        await connectDB();
        const existUser = await Member.findOne({ email });

        // 첫 로그인인 경우
        if (!existUser) {
          try {
            const newMember = await Member.create({
              name: name,
              email: email,
              provider: provider,
              nickname: name,
            });
            console.log("📍회원가입 성공", NextResponse.json(newMember));
          } catch (error) {
            console.log("🔥회원가입 실패", error);
          }
        }
        //회원 정보 가져오기
      }

      return true;
    },
  },
});
export { handler as GET, handler as POST };
