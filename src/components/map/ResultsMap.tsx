import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { stateContext } from "../../utility/context/appState";
import { Restaurant } from "../../utility/types";
import { LatLong } from "./types";

type ResultsMapsProps = {
  data: Restaurant[];
};
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter: LatLong = { lat: 40.6779924, lng: -73.9960648 };

function ResultsMap({ data }: ResultsMapsProps) {
  const { map, setMap } = useContext(stateContext);
  const [mapCenter, setmapCenter] = useState<LatLong>(defaultCenter);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          onLoad={(m) => setMap(m)}
          zoom={12}
          center={mapCenter}
          mapContainerStyle={mapContainerStyle}
        >
          {data.map(
            (entry) =>
              entry.coordinates && (
                <Marker
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
