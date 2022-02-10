import { useContext, useState } from "react";
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

const loadingStyle = {
  backgroundColor: COLOR.DARK_TEAL,
};
function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  const { setDataState, isLoading, setIsLoading } = useContext(stateContext);

  const disableSearch = (query: string): boolean => {
    const emptyString = query === "";
    const stringTooLong = query.length > 40;

    return emptyString || stringTooLong || isLoading;
  };

  const mapBounds = useMapBoundsToString();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    // TODO: Only use buildFetchDataUrl
    // https://github.com/billy-yuan/search-restaurants-front-end/issues/18
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [searchQuery]);
    const url = buildFetchDataUrl(searchQuery, {}, mapBounds);
    const response = await fetchData(url);
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
