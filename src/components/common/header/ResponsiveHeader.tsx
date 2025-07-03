"use client";

import MobileHeader from "./MobileHeader";
import Header from "./Hearder";
import useIsMobile from "@/lib/hooks/useIsMobile";

export default function ResponsiveHeader() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;

  return isMobile ? <MobileHeader /> : <Header />;
}
