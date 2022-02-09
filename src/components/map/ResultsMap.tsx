import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { stateContext } from "../../utility/context/appState";
import { Restaurant } from "../../utility/types";
import { selectedMarker } from "../icons";
import { SearchAreaButton } from "./SearchAreaButton";
import { LatLong, ZoomType } from "./types";
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

const defaultCenter: LatLong = { lat: 40.6779924, lng: -73.9960648 };

function ResultsMap({ data }: ResultsMapsProps) {
  const { setShouldFetchData, map, setMap } = useContext(stateContext);
  const [mapCenter, setmapCenter] = useState<LatLong>(defaultCenter);
  const [showRedoSearch, setShowRedoSearch] = useState<boolean>(false);

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
          onLoad={(m) => setMap(m)}
          zoom={12}
          center={mapCenter}
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
              setShouldFetchData(true);
            }}
          >
            {showRedoSearch && <SearchAreaButton callback={() => null} />}
          </div>
          {data.map(
            (entry) =>
              entry.coordinates && (
                <Marker
                  icon={selectedMarker}
                  position={{
                    lat: entry.coordinates.latitude,
                    lng: entry.coordinates.longitude,
                  }}
                />
              )
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default ResultsMap;
