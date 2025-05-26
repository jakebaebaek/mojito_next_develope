import KakaoProvider from "next-auth/providers/kakao";
import connectDB from "@/lib/db";
import { Member, MemberStore } from "@/lib/schemas/member";
import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token.accessToken = account.access_token;

        try {
          await connectDB();
          const member = await Member.findOne({ email: token.email });
          const memberStore = await MemberStore.findOne(
            { userId: member?._id },
            "heart memo"
          );

          if (member) {
            token.id = member._id;
            token.nickname = member.nickname;
            token.memberStore = memberStore
              ? JSON.parse(JSON.stringify(memberStore))
              : null; // JSON 변환 추가
            token.firstLogin = false;
          }
        } catch (error) {
          console.error("2️⃣ jwt 에러", error);
        }
      }

      if (
        trigger === "update" &&
        session?.user.firstLogin !== token.firstLogin
      ) {
        token.firstLogin = session.user.firstLogin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        nickname: token.nickname as string | null | undefined,
        memberStore: token.memberStore,
        firstLogin: token.firstLogin as boolean,
      };
      return session;
    },
    async signIn({ user, account }) {
      try {
        if (account && user.name && user.email) {
          const { name, email } = user;
          const { provider } = account;

          await connectDB();
          const existUser = await Member.findOne({ email });

          if (!existUser) {
            try {
              const newMember = await Member.create({
                name,
                email,
                provider,
                nickname: name,
              });

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
  secret: process.env.NEXTAUTH_SECRET,
};