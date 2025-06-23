import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    if (
      /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 575px)").matches
    )
      setIsMobile(true);
  };

  useEffect(() => {
    checkMobile();
  }, []);

  return isMobile;
}
