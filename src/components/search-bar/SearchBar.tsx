import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import UrlBuilder from "../../utility/urlBuilder";
import { Oval } from "react-loader-spinner";
import { stateContext } from "../../utility/context/appState";
import { SearchIcon } from "../icons";
import "./style.css";
import { COLOR } from "../../styles/colors";
import { buildFetchDataUrl } from "../results/helper";
import { mapBoundsToString } from "../results/utility";
import { setMapArea } from "../map/utility";

type SearchBarProps = {
  callback?: () => void;
};
const loadingStyle = {
  backgroundColor: COLOR.DARK_TEAL,
};

function SearchBar({ callback }: SearchBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  let mapBounds: {
    ne: string;
    sw: string;
  } | null = null;
  const [isError, setIsError] = useState<boolean>(false);

  const {
    map,
    dataState,
    setDataState,
    isLoading,
    searchQuery,
    setSearchQuery,
  } = useContext(stateContext);

  const disableSearch = (query: string): boolean => {
    const emptyString = query === "";
    const stringTooLong = query.length > 40;

    return emptyString || stringTooLong || isLoading;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: The search function should not be aware of the map. Right now, I am
    // making the search bar aware of the map by setting the "map" argument to null.
    // https://github.com/billy-yuan/search-restaurants-front-end/issues/32
    // The business requirement is that the search bar will reset the map area.
    const url = buildFetchDataUrl(searchQuery, {}, null);

    setDataState({ ...dataState, query: searchQuery });
    navigate(`/results?${url.encodeParameters()}`);
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
            value={searchQuery}
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
