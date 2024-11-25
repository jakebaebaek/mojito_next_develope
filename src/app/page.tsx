import Image from "next/image";
import style from "./page.module.scss";
import Card from "@/components/card/Card";
import MemoCard from "@/components/card/MemoCard";
import Button from "@/components/button/Button";
import Navigation from "@/components/navigation/Navigation";
import LoginModal from "@/components/modal/LoginModal";
import Top100 from "@/components/top100/Top100";
import FilterSection from "@/components/home/FilterSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={`${style.main_page}`}>
        <Top100 />
        <FilterSection />
      </div>
    </>
  );
}
