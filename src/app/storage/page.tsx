import Storage from "./Storage";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function StoragePage() {
  const session = await getServerSession(authOptions);
  const { heart, memo } = session?.user?.memberStore;

  return (
    <>
      <Storage heartList={heart} memoList={memo} />
    </>
  );
}
