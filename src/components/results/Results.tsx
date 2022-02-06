import { Navigate, useLocation } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import { createFilters } from "./filter/helpers";
import UrlBuilder from "../../utility/urlBuilder";

type CurrentFilter = {
  [key: string]: string[];
};

/**
 * Passes the data + query term from the search page after the user clicks search.
 */
function useGetState(): { data: object[]; query: string } | null {
  let { state } = useLocation();

  try {
    if (
      state !== null &&
      state !== undefined &&
      typeof state === "object" &&
      typeof state.query === "string" &&
      state.data.constructor === [].constructor
    ) {
      return state;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

function Results() {
  const { data, query } = useGetState();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [resultsState, setResultsState] = useState({ data, query });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>({
    articles: [],
    categories: [],
  });

  if (!data) {
    return <Navigate to="/" />;
  }

  const filterOptions = createFilters(data);

  // Make filter request
  useEffect(() => {
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [query]);

    for (let name of Object.keys(currentFilter)) {
      let filter = currentFilter[name];
      if (filter.length > 0) {
        SearchUrl.addQueryParameter(name, currentFilter[name]);
      }
    }

    // Fetch data
    const refreshData = async (url: string) => {
      fetchData(url).then((res) => {
        setResultsState({ ...resultsState, data: res.body });
        setIsLoading(false);
      });
    };

    if (!initialLoad) {
      setIsLoading(true);
      const url = SearchUrl.buildUrl();
      refreshData(url);
    } else {
      setInitialLoad(false);
    }
  }, [currentFilter]);

  return (
    <div>
      <Filter
        filterOptions={filterOptions}
        currentFilter={currentFilter}
        setFilter={setCurrentFilter}
        isLoading={isLoading}
      />
      {`Showing ${resultsState.data.length} results for "${query}"`}
      {resultsState.data.map((value) => (
        <RestaurantCard key={value._id} restaurant={value} />
      ))}
    </div>
  );
}

export default Results;
