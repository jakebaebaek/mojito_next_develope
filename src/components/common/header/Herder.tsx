"use client";

import Link from "next/link";
import style from "./header.module.scss";
import Search from "@public/Search.svg";
import LoginBtn from "./LoginBtn";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const memberName = session?.user?.name;
  console.log("🚨", session);
  const router = useRouter();

  const goToStorage = () => {
    if (!session) {
      alert("로그인 후 이용해주세요.");
    } else {
      if (!memberName) return;
      router.push("/storage");
    }
  };

  return (
    <>
      <div className={`${style.header}`}>
        <div className={`${style.nav_container}`}>
          <Link className={`${style.home_btn}`} href="/">
            {/* <img src="" alt="Emoji" /> */}
            <div>🍹</div>
            <div>모히또에서 몰디브 한 잔</div>
          </Link>
          <ul>
            <Link href="/find">
              <li className={`${style.search_btn}`}>
                <Search className={`${style.search_svg}`} />
                <div>칵테일 검색</div>
              </li>
            </Link>
            <li className={`${style.storage_btn}`} onClick={goToStorage}>
              내 칵테일 창고
            </li>
          </ul>
        </div>
        <LoginBtn />
      </div>
    </>
  );
}
