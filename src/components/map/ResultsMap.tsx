import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { LatLong } from "./types";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter: LatLong = { lat: 40.6779924, lng: -73.9960648 };

function ResultsMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapCenter, setmapCenter] = useState<LatLong>(defaultCenter);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          onLoad={(m) => setMap(m)}
          zoom={12}
          center={mapCenter}
          mapContainerStyle={mapContainerStyle}
        ></GoogleMap>
      </LoadScript>
    </>
  );
}

export default ResultsMap;
