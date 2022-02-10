const defaultMapBounds: { ne: string; sw: string } = {
  ne: "40.77842,-73.94285",
  sw: "40.578978,-74.04928",
};

/**
 * Returns NE and SW corners of the map area as a string in the following format:
 * `${lat}, ${long}`
 *
 * `Example: {ne: "34.2342, -65.234", sw: "24.234, -63.221"}`
 */
export function useMapBoundsToString(
  map: google.maps.Map | null
): { ne: string; sw: string } | null {
  if (!map) {
    return defaultMapBounds;
  }
  const mapBounds = map.getBounds();

  if (!mapBounds) {
    return null;
  }

  const mapBoundsNE = mapBounds.getNorthEast().toUrlValue();
  const mapBoundsSW = mapBounds.getSouthWest().toUrlValue();

  return { ne: mapBoundsNE, sw: mapBoundsSW };
}
