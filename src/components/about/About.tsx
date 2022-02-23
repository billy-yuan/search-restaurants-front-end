import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Logo } from "../logo";
import { aboutText } from "./aboutText";
import "./style.css";

export function About() {
  const navigate = useNavigate();

  // Scroll to top of page on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-logo">
        <Logo onClick={() => navigate("/")} />
        <div className="about-text">
          <ReactMarkdown>{aboutText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
