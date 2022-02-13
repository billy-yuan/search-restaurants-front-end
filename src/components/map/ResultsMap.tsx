import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utility/api/endpoints";
import { stateContext } from "../../utility/context/appState";
import { FETCH_DATA_ACTION_TYPE } from "../../utility/context/reducers/fetchDataReducer";
import { makeGoogleMapsUrl } from "../../utility/makeGoogleMapsUrl";
import { Restaurant } from "../../utility/types";
import { selectedMarker, unselectedMarker } from "../icons";
import { buildFetchDataUrl } from "../results/helper";
import { mapBoundsToString } from "../results/utility";
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
  const {
    fetchDataDispatch,
    currentFilter,
    searchQuery,
    selected,
    setSelected,
    map,
    setMap,
  } = useContext(stateContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showRedoSearch, setShowRedoSearch] = useState<boolean>(false);
  const [isMouseoverOverlay, setIsMouseoverOverlay] = useState<boolean>(false);
  const [isMouseoverMarker, setIsMouseoverMarker] = useState<boolean>(false);
  const [clickRedoSearch, setClickRedoSearch] = useState<number>(0);

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
            const currentUrl = `${BASE_URL}${location.pathname}${location.search}`;
            const bounds = getMapBoundsFromCurrentUrl(currentUrl);
            if (bounds) {
              m.fitBounds(bounds, 0);
            } else {
              m.setCenter(defaultCenter);
            }
            setMap(m);
            fetchDataDispatch({ type: FETCH_DATA_ACTION_TYPE.FETCH_DATA });
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
              const mapBounds = mapBoundsToString(map);
              const url = buildFetchDataUrl(
                searchQuery,
                currentFilter,
                mapBounds
              );
              setClickRedoSearch(clickRedoSearch + 1);
              fetchDataDispatch({ type: FETCH_DATA_ACTION_TYPE.FETCH_DATA });
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
