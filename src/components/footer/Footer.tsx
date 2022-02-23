import { useNavigate } from "react-router-dom";
import "./style.css";

export function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
  };
  return (
    <div className="footer-container">
      <div onClick={() => handleClick()}>About</div>
    </div>
  );
}
