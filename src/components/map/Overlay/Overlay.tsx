import { OverlayView } from "@react-google-maps/api";
import { useContext } from "react";
import { stateContext } from "../../../utility/context/appState";
import { makeGoogleMapsUrl } from "../../../utility/makeGoogleMapsUrl";
import { Restaurant } from "../../../utility/types";
import { LinkButton } from "../../icons";
import "./style.css";

type OverlayProps = {
  restaurant: Restaurant;
  isMouseoverOverlay: boolean;
  setIsMouseoverOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  isMouseoverMarker: boolean;
};
export function Overlay({
  restaurant,
  isMouseoverOverlay,
  setIsMouseoverOverlay,
  isMouseoverMarker,
}: OverlayProps) {
  const { selected, setSelected } = useContext(stateContext);
  if (selected?._id !== restaurant._id) {
    return <></>;
  }

  if (!isMouseoverOverlay && !isMouseoverMarker) {
    return <></>;
  }

  if (!selected) {
    return <></>;
  }

  const googleMapsUrl = makeGoogleMapsUrl(
    `${selected.name} ${selected.address}`
  );

  return (
    <OverlayView
      position={{
        lat: restaurant?.coordinates.latitude,
        lng: restaurant?.coordinates.longitude,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className="map-overlay-container"
        onMouseEnter={() => setIsMouseoverOverlay(true)}
        onMouseLeave={() => {
          setIsMouseoverOverlay(false);
          if (!isMouseoverMarker) {
            setSelected(null);
          }
        }}
      >
        <div className="map-overlay-name">{restaurant.name}</div>
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
