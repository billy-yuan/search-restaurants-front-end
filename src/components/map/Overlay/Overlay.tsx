import { OverlayView } from "@react-google-maps/api";
import { useContext } from "react";
import { stateContext } from "../../../utility/context/appState";
import { makeGoogleMapsUrl } from "../../../utility/makeGoogleMapsUrl";
import { LinkButton } from "../../icons";
import "./style.css";

export function Overlay() {
  const { selected } = useContext(stateContext);
  if (!selected?.coordinates) {
    return <></>;
  }

  const googleMapsUrl = makeGoogleMapsUrl(
    `${selected.name} ${selected.address}`
  );

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
        <div className="map-overlay-button">
          <LinkButton url={googleMapsUrl} displayText="Google Maps" />
        </div>
      </div>
    </OverlayView>
  );
}
