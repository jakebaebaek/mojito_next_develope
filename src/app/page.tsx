import style from "./page.module.scss";
import Navigation from "@/components/common/navigation/Navigation";
import Top100 from "@/components/top100/Top100";
import FilterSection from "@/components/main/FilterSection";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { getEmoji } from "@/lib/fetchs/fetchEmoji";
import EmojiClient from "@/components/render/EmojiClient";

export default async function Home() {
  const emoji = await getEmoji();
  return (
    <>
      <Navigation />
      <EmojiClient emoji={emoji} />
      <div className={`${style.main_page}`}>
        <Top100 />
        <div>
          <FilterSection />
        </div>
      </div>
    </>
  );
}
