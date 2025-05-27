import style from "./page.module.scss";
import Navigation from "@/components/common/navigation/Navigation";
import Top100 from "@/components/top100/Top100";
import FilterSection from "@/components/main/FilterSection";
import EmojiClient from "@/components/render/EmojiClient";

export default async function Home() {
  return (
    <>
      <Navigation />
      <EmojiClient />
      <div className={`${style.main_page}`}>
        <Top100 />
        <div>
          <FilterSection />
        </div>
      </div>
    </>
  );
}
