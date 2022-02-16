import { useEffect, useState } from "react";

const mobileWidthPixels = 768;

export function useIsMobile(): boolean {
  const mobileMediaQuery = `screen and (max-width: ${mobileWidthPixels}px)`;

  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia(mobileMediaQuery).matches
  );

  const handleResize = () => {
    setIsMobile(window.matchMedia(mobileMediaQuery).matches);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}
