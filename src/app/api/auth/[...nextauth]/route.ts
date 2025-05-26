import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

declare module "next-auth" {
  interface Session {
    user: {
      nickname?: string | null;
      id?: any;
      memberStore?: any;
      firstLogin?: boolean;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
