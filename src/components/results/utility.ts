import { useContext } from "react";
import { stateContext } from "../../utility/context/appState";

/**
 * Returns NE and SW corners of the map area as a string in the following format:
 * `${lat}, ${long}`
 *
 * `Example: {ne: "34.2342, -65.234", sw: "24.234, -63.221"}`
 */
export function useMapBoundsToString(): { ne: string; sw: string } | null {
  const { map } = useContext(stateContext);
  if (!map) {
    return null;
  }
  const mapBounds = map.getBounds();

  if (!mapBounds) {
    return null;
  }

  const mapBoundsNE = mapBounds.getNorthEast().toUrlValue();
  const mapBoundsSW = mapBounds.getSouthWest().toUrlValue();

  return { ne: mapBoundsNE, sw: mapBoundsSW };
}