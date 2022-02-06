import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import UrlBuilder from "../../utility/urlBuilder";
import { Oval } from "react-loader-spinner";

function disableSearch(query: string): boolean {
  const emptyString = query === "";
  const stringTooLong = query.length > 40;

  return emptyString || stringTooLong;
}

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [searchQuery]);
    const url = SearchUrl.buildUrl();
    const response = await fetchData(url);

    if (response.status === 200) {
      setIsLoading(false);
      navigate(`/results?${SearchUrl.encodeParameters()}`, {
        state: { query: searchQuery, data: response.body },
      });
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
