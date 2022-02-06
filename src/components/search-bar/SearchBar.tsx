import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import UrlBuilder from "../../utility/urlBuilder";
import { Oval } from "react-loader-spinner";
import { stateContext } from "../../utility/context/appState";

function disableSearch(query: string): boolean {
  const emptyString = query === "";
  const stringTooLong = query.length > 40;

  return emptyString || stringTooLong;
}

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  const { setDataState, isLoading, setIsLoading } = useContext(stateContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [searchQuery]);
    const url = SearchUrl.buildUrl();

    const response = await fetchData(url);

    if (response.status === 200 && response.body) {
      setIsLoading(false);
      setDataState({ query: searchQuery, data: response.body });
      navigate(`/results?${SearchUrl.encodeParameters()}`);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      {isError && <p>There was an error</p>}
      <form method="/get" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Search for a restaurant
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button
          type="submit"
          value="Submit"
          disabled={isLoading || disableSearch(searchQuery)}
        >
          {isLoading ? <Oval /> : "Search"}
        </button>
      </form>
    </>
  );
}

export default SearchBar;
