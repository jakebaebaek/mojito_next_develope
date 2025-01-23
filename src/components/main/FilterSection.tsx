"use client";

import { useState, useEffect } from "react";
import { getCocktail } from "@/lib/fetchs/fetchCocktail";
import { TCocktail } from "@/lib/types/TCocktail";
import { useOffsetStore } from "@/lib/store/offsetStore";

import style from "./FilterSection.module.scss";
import Filter from "./filter/Filter";
import CocktailList from "@/components/main/cocktailList/CocktailList";

interface FilterSectionProps {
  initialCocktails: TCocktail[];
}

export default function FilterSection({
  initialCocktails,
}: FilterSectionProps) {
  const [cocktailList, setCocktailList] =
    useState<TCocktail[]>(initialCocktails);
  const { offset, setOffset } = useOffsetStore();
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newCocktails = await getCocktail(offset);
    setCocktailList((prev) => [...prev, ...newCocktails]);
    setOffset(offset + 25);
    setLoading(false);
  };

  useEffect(() => {
    const storedOffset = sessionStorage.getItem("offset-storage");
    if (storedOffset) {
      const fetchInitialCocktails = async () => {
        const newCocktails = await getCocktail(parseInt(storedOffset, 10));
        setCocktailList(newCocktails);
      };
      fetchInitialCocktails();
    } else {
      setCocktailList(initialCocktails);
    }
  }, [initialCocktails]);

  return (
    <div className={`${style.filter_section}`}>
      <h1>Filter Section</h1>
      <div className={`${style.filter_card_wrap}`}>
        <div className={`${style.fitler_wrap}`}>
          <Filter />
        </div>
        <div className={`${style.card_wrap}`}>
          <CocktailList
            cocktailList={cocktailList}
            loadMore={loadMore}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
