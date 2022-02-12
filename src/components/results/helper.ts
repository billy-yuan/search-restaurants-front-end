import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import { CurrentFilter } from "../../utility/types";
import UrlBuilder from "../../utility/urlBuilder";
import { mapBoundsToString } from "./utility";

export function buildFetchDataUrl(
  query: string,
  filters: CurrentFilter,
  map: google.maps.Map | null
): UrlBuilder {
  const mapBounds = mapBoundsToString(map);
  const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
  SearchUrl.addQueryParameter("q", [query]);
  if (mapBounds) {
    SearchUrl.addQueryParameter("ne_bound", [mapBounds.ne]).addQueryParameter(
      "sw_bound",
      [mapBounds.sw]
    );
  }

  for (let name of Object.keys(filters)) {
    let filter = filters[name];
    if (filter.length > 0) {
      SearchUrl.addQueryParameter(name, filter);
    }
  }
  return SearchUrl;
}

export function buildFetchDataUrlFromSearchParams(searchParams: string) {
  return `${BASE_URL}${SEARCH_ENDPOINT}${searchParams}`;
}
