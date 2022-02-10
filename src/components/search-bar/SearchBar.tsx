import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import UrlBuilder from "../../utility/urlBuilder";
import { Oval } from "react-loader-spinner";
import { stateContext } from "../../utility/context/appState";
import { Restaurant } from "../../utility/types";
import { SearchIcon } from "../icons";
import "./style.css";
import { COLOR } from "../../styles/colors";
import { buildFetchDataUrl } from "../results/helper";
import { useMapBoundsToString } from "../results/utility";
import { defaultCenter, defaultZoom, setMapArea } from "../map/utility";
import { MAP_PROPERTIES } from "../map/types";

type SearchBarProps = {
  callback?: () => void;
};
const loadingStyle = {
  backgroundColor: COLOR.DARK_TEAL,
};

// Requirement is to reset map to default view when user clicks search.
function handleMapAfterSearch(map: google.maps.Map | null) {
  setMapArea(map, {
    [MAP_PROPERTIES.CENTER]: defaultCenter,
    [MAP_PROPERTIES.ZOOM]: defaultZoom,
  });
}

function SearchBar({ callback }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  let mapBounds: {
    ne: string;
    sw: string;
  } | null = null;
  const [isError, setIsError] = useState<boolean>(false);

  const { map, setMap, setDataState, isLoading, setIsLoading } =
    useContext(stateContext);

  const disableSearch = (query: string): boolean => {
    const emptyString = query === "";
    const stringTooLong = query.length > 40;

    return emptyString || stringTooLong || isLoading;
  };

  // Update map bounds whenever map is updated.
  // When the user changes pages, the map is reset.
  // This hook ensures that the previous search's map area is not used.
  useEffect(() => {
    mapBounds = useMapBoundsToString(null);
  }, [map]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    // TODO: Only use buildFetchDataUrl
    // https://github.com/billy-yuan/search-restaurants-front-end/issues/18
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [searchQuery]);

    const url = buildFetchDataUrl(searchQuery, {}, mapBounds);
    const response = await fetchData(url).then((res) => {
      // Requirement is that the map area ia reset if the user uses the search bar.
      handleMapAfterSearch(map);
      if (callback) {
        callback();
      }
      return res;
    });
    if (
      response.status === 200 &&
      response.body &&
      typeof response.body === "object"
    ) {
      setIsLoading(false);
      setDataState({ query: searchQuery, data: response.body as Restaurant[] });
      navigate(`/results?${SearchUrl.encodeParameters()}`);
    } else {
      setDataState({ query: searchQuery, data: [] });
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      {isError && <p>There was an error</p>}
      <form
        className="search-form"
        method="/get"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Type a name, article, or mood"
          />

          <button
            className="search-button"
            type="submit"
            value="Submit"
            disabled={disableSearch(searchQuery)}
            style={isLoading ? loadingStyle : {}}
          >
            <div className="search-icon">
              {isLoading ? (
                <Oval width={"100%"} height={"100%"} color="white" />
              ) : (
                <SearchIcon color={"white"} />
              )}
            </div>
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
