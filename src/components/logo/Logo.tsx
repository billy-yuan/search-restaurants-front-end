import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../../utility/hooks";
import "./style.css";

type LogoProps = {
  onClick?: () => void;
  cursorToPointer?: boolean;
};

export function Logo({ onClick, cursorToPointer = true }: LogoProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const isMobile = useIsMobile();
  const location = useLocation();
  const isResultsPage = location.pathname === "/results";

  return (
    <div
      style={style}
      onMouseEnter={() => cursorToPointer && setStyle({ cursor: "pointer" })}
      onMouseLeave={() => setStyle({})}
      className="logo"
      onClick={() => onClick && onClick()}
    >
      {isMobile && isResultsPage ? "S" : "Search Eater"}
    </div>
  );
}
