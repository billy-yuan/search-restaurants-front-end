import { OverlayView } from "@react-google-maps/api";
import { useContext } from "react";
import { stateContext } from "../../../utility/context/appState";
import "./style.css";

export function Overlay() {
  const { selected } = useContext(stateContext);

  if (!selected?.coordinates) {
    return <></>;
  }

  return (
    <OverlayView
      position={{
        lat: selected?.coordinates.latitude,
        lng: selected?.coordinates.longitude,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="map-overlay-container">
        <div className="map-overlay-name">{selected.name}</div>
        <div className="map-overlay-categories">
          {selected.categories.join(" ")}
        </div>
      </div>
    </OverlayView>
  );
}
