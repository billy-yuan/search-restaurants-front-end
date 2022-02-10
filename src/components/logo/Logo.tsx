import "./style.css";

type LogoProps = {
  onClick?: () => void;
};
export function Logo({ onClick }: LogoProps) {
  return (
    <div className="logo" onClick={() => onClick && onClick()}>
      Search Eater
    </div>
  );
}
