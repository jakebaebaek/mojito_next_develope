"use client";

import Link from "next/link";
import style from "./header.module.scss";
import Search from "@public/Search.svg";
import LoginBtn from "./LoginBtn";
import CocktailStorage from "@public/CocktailStorage.svg";
import Home from "@public/Home.svg";
import Heart from "@public/Heart.svg";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useModalStore } from "@/lib/store/modalStore";

export default function MobileHeader() {
  const { data: session } = useSession();
  const { openLoginModal } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  const linkToMenu = (href: string) => {
    if (href === "/storage" && !session) {
      openLoginModal();
    } else {
      router.push(href);
    }
  };

  return (
    <div className={style.mobile_header}>
      <div className={`${style.mobile_nav_container}`}>
        <Link href="/" legacyBehavior>
          <a
            className={`${style.menu_item} ${
              pathname === "/" ? style.active : ""
            }`}
          >
            <Home className={`${style.home_svg}`} />
          </a>
        </Link>
        <div
          onClick={() => linkToMenu("/find")}
          className={`${style.menu_item} ${
            pathname === "/find" ? style.active : ""
          }`}
        >
          <Search className={`${style.search_svg}`} />
        </div>
        <div
          onClick={() => linkToMenu("/storage")}
          className={`${style.menu_item} ${
            pathname === "/storage" ? style.active : ""
          }`}
        >
          <Heart className={`${style.storage_svg}`} />
        </div>
        <div
          onClick={() => linkToMenu("/mypage")}
          className={`${style.menu_item} ${
            pathname === "/mypage" ? style.active : ""
          }`}
        >
          <LoginBtn />
        </div>
      </div>
    </div>
  );
}
