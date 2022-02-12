import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../../utility/context/appState";
import { makeGoogleMapsUrl } from "../../utility/makeGoogleMapsUrl";
import { Restaurant } from "../../utility/types";
import { selectedMarker, unselectedMarker } from "../icons";
import { buildFetchDataUrl } from "../results/helper";
import { Overlay } from "./Overlay";
import { SearchAreaButton } from "./SearchAreaButton";
import { ZoomType } from "./types";
import { defaultCenter, getMapBoundsFromCurrentUrl } from "./utility";
import { ZoomButtons } from "./ZoomButtons";

type ResultsMapsProps = {
  data: Restaurant[];
};
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const googleMapsOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
};

export const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

function ResultsMap({ data }: ResultsMapsProps) {
  const { currentFilter, searchQuery, selected, setSelected, map, setMap } =
    useContext(stateContext);
  const navigate = useNavigate();
  const [showRedoSearch, setShowRedoSearch] = useState<boolean>(false);
  const [isMouseoverOverlay, setIsMouseoverOverlay] = useState<boolean>(false);
  const [isMouseoverMarker, setIsMouseoverMarker] = useState<boolean>(false);

  const handleMarkerMouseOut = () => {
    setTimeout(() => {
      setIsMouseoverMarker(false);
      if (!isMouseoverOverlay) {
        setSelected(null);
      }
    }, 30);
  };

  const handleZoomClick = (zoomType: ZoomType) => {
    const zoomLevel = map?.getZoom();
    if (!map || zoomLevel === undefined) {
      return;
    }
    setShowRedoSearch(true);

    switch (zoomType) {
      case ZoomType.ZOOM_IN:
        map.setZoom(zoomLevel + 1);
        break;
      case ZoomType.ZOOM_OUT:
        map.setZoom(zoomLevel - 1);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          onLoad={(m) => {
            m.setCenter(defaultCenter);
            const bounds = getMapBoundsFromCurrentUrl();
            if (bounds) {
              m.fitBounds(bounds, 0);
            }
            setMap(m);
          }}
          zoom={12}
          mapContainerStyle={mapContainerStyle}
          onDrag={() => setShowRedoSearch(true)}
          options={googleMapsOptions}
        >
          <ZoomButtons
            zoomInCallback={() => handleZoomClick(ZoomType.ZOOM_IN)}
            zoomOutCallback={() => handleZoomClick(ZoomType.ZOOM_OUT)}
          />
          <div
            onClick={() => {
              setShowRedoSearch(false);
              const url = buildFetchDataUrl(searchQuery, currentFilter, map);
              navigate(`/results?${url.encodeParameters()}`);
            }}
          >
            {showRedoSearch && <SearchAreaButton callback={() => null} />}
          </div>

          {data.map(
            (entry) =>
              entry.coordinates && (
                <>
                  <Overlay
                    restaurant={entry}
                    isMouseoverOverlay={isMouseoverOverlay}
                    setIsMouseoverOverlay={setIsMouseoverOverlay}
                    isMouseoverMarker={isMouseoverMarker}
                  />
                  <Marker
                    onClick={() => {
                      window.open(
                        makeGoogleMapsUrl(`${entry.name} ${entry.address}`),
                        "_blank"
                      );
                    }}
                    onMouseOver={() => {
                      setIsMouseoverMarker(true);
                      setSelected(entry);
                    }}
                    onMouseOut={() => handleMarkerMouseOut()}
                    icon={
                      selected?._id === entry._id
                        ? selectedMarker
                        : unselectedMarker
                    }
                    position={{
                      lat: entry.coordinates.latitude,
                      lng: entry.coordinates.longitude,
                    }}
                  >
                    <a href={`${"www.google.com"}`} target="_blank" />
                  </Marker>
                </>
              )
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default ResultsMap;
