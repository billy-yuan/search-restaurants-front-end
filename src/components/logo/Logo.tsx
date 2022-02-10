import { useState } from "react";
import "./style.css";

type LogoProps = {
  onClick?: () => void;
  cursorToPointer?: boolean;
};
export function Logo({ onClick, cursorToPointer = true }: LogoProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  return (
    <div
      style={style}
      onMouseEnter={() => cursorToPointer && setStyle({ cursor: "pointer" })}
      onMouseLeave={() => setStyle({})}
      className="logo"
      onClick={() => onClick && onClick()}
    >
      Search Eater
    </div>
  );
}
