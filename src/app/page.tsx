import style from "./page.module.scss";
import Navigation from "@/components/common/navigation/Navigation";
import Top100 from "@/components/top100/Top100";
import FilterSection from "@/components/main/FilterSection";
import { getEmoji } from "@/lib/fetchs/fetchEmoji";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";

export default async function Home() {
  const response25 = await getCocktail(25, 0);
  const initialCocktails = response25.cocktails;
  const totalCocktailCount = response25.totalCount;

  return (
    <>
      <Navigation />
      <div className={`${style.main_page}`}>
        <Top100 />
        <div>
          <FilterSection
            initialCocktails={initialCocktails}
            totalCocktailCount={totalCocktailCount}
          />
        </div>
      </div>
    </>
  );
}
