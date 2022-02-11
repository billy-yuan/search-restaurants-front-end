export function makeGoogleMapsUrl(query: string) {
  const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search";
  const parameters = `${query}`.split(" ").join("+");

  return `${GOOGLE_MAPS_SEARCH_URL}/${parameters}`;
}
