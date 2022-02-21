import { useNavigate } from "react-router-dom";
import { Logo } from "../logo";
import { aboutText } from "./aboutText";
import "./style.css";

export function About() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <div className="about-logo">
        <Logo onClick={() => navigate("/")} />
        <div className="about-text">{aboutText}</div>
      </div>
    </div>
  );
}
