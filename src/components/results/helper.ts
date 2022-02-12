import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import UrlBuilder from "../../utility/urlBuilder";
import { CurrentFilter } from "./Results";

export function buildFetchDataUrl(
  query: string,
  filters: CurrentFilter,
  mapBounds: {
    ne: string;
    sw: string;
  } | null,
  path?: string
): UrlBuilder {
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
