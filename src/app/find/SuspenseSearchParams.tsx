"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  setClickedHashtag: (value: string) => void;
};

export default function SuspenseSearchParams({ setClickedHashtag }: Props) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const linkTop100 = searchParams.get("linkTop100");
    if (linkTop100 === "1") {
      setClickedHashtag("top100");
    }
  }, [searchParams, setClickedHashtag]);

  return null;
}
