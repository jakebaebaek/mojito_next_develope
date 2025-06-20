import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPod|Mobile/i.test(navigator.userAgent));
  }, []);

  console.log("😈", isMobile);
  return isMobile;
}
