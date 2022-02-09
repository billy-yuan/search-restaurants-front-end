import "./style.css";

type ZoomButtonsProps = {
  zoomInCallback: () => void;
  zoomOutCallback: () => void;
};

export function ZoomButtons({
  zoomInCallback,
  zoomOutCallback,
}: ZoomButtonsProps) {
  return (
    <div className="zoom-container">
      <div className="zoom-in" onClick={zoomInCallback}>
        +
      </div>
      <div className="zoom-out" onClick={zoomOutCallback}>
        -
      </div>
    </div>
  );
}
