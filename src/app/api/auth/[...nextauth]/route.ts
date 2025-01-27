import NextAuth, { DefaultSession } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import connectDB from "@/lib/db";
import { Member, MemberStore } from "@/lib/schemas/member";
import { NextResponse } from "next/server";

declare module "next-auth" {
  interface Session {
    user: {
      nickname?: string | null;
      id?: any;
      memberStore?: any;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    // 카카오 Provider
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        try {
          await connectDB();
          const member = await Member.findOne({ email: token.email });
          const memberStore = await MemberStore.findOne({
            userId: member._id,
          });

          token.id = member._id;
          token.nickname = member.nickname;
          token.memberStore = memberStore;
        } catch (error) {
          console.error("2️⃣ jwt 에러", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
    async signIn({ user, account }) {
      try {
        if (account && user.name && user.email) {
          const { name, email } = user;
          const { provider } = account;

          await connectDB();
          const existUser = await Member.findOne({ email });

          // 첫 로그인인 경우
          if (!existUser) {
            try {
              //회원 db 생성
              const newMember = await Member.create({
                name: name,
                email: email,
                provider: provider,
                nickname: name,
              });

              //member store db 생성
              const newStore = await MemberStore.create({
                userId: newMember.id,
              });

              console.log("📍회원가입 성공", NextResponse.json(newStore));
            } catch (error) {
              console.log("🔥회원가입 실패", error);
            }
          }
        }
        return true;
      } catch (error) {
        console.error("1️⃣ 로그인 에러", error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
