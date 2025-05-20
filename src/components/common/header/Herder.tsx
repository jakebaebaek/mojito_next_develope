"use client";

import Link from "next/link";
import style from "./header.module.scss";
import Search from "@public/Search.svg";
import LoginBtn from "./LoginBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/lib/store/modalStore";

export default function Header() {
  const { data: session } = useSession();
  const { openLoginModal } = useModalStore();

  const memberName = session?.user?.name;
  const router = useRouter();

  const linkToMenu = (name: string) => {
    if (name === "storage") {
      if (!session) {
        openLoginModal();
      } else {
        if (!memberName) return;
        router.push(`/${name}`);
      }
    } else {
      if (!session) {
        console.log("로그인 해주세요");
      }
      console.log("검색이동");
      router.push(`/${name}`);
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
            <li
              onClick={() => linkToMenu("find")}
              className={`${style.search_btn}`}
            >
              <Search className={`${style.search_svg}`} />
              <div>칵테일 검색</div>
            </li>
            <li
              className={`${style.storage_btn}`}
              onClick={() => linkToMenu("storage")}
            >
              내 칵테일 창고
            </li>
          </ul>
        </div>
        <LoginBtn />
      </div>
    </>
  );
}
