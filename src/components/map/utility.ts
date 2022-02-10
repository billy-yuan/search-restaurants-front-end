import { LatLong, MapProperties, MAP_PROPERTIES } from "./types";

export const defaultCenter: LatLong = { lat: 40.6779924, lng: -73.9960648 };
export const defaultZoom: number = 12;

export function setMapArea(
  map: google.maps.Map | null,
  properties: MapProperties
) {
  for (let key of Object.keys(properties)) {
    switch (key) {
      case MAP_PROPERTIES.CENTER:
        const mapCenter = properties[MAP_PROPERTIES.CENTER];
        if (mapCenter !== undefined) {
          map?.setCenter(mapCenter);
        }
      case MAP_PROPERTIES.ZOOM:
        const zoom = properties[MAP_PROPERTIES.ZOOM];
        if (zoom !== undefined) {
          map?.setZoom(zoom);
        }
    }
  }
}
