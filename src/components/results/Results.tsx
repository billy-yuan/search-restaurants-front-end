import { Navigate, useLocation } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import { createFilters } from "./filter/helpers";
import UrlBuilder from "../../utility/urlBuilder";
import { Restaurant } from "../../utility/types";
import SearchBar from "../search-bar";
import { Grid } from "react-loader-spinner";

type CurrentFilter = {
  [key: string]: string[];
};

type ResultsState = {
  query: string;
  data: Restaurant[];
};
type LocationState = {
  state: ResultsState;
};

function ResultsList({ data, query }: { data: Restaurant[]; query: string }) {
  return (
    <>
      {`Showing ${data.length} results for "${query}"`}
      {data.map((value) => (
        <RestaurantCard key={value._id} restaurant={value} />
      ))}
    </>
  );
}

/**
 * Passes the data + query term from the search page after the user clicks search.
 */
function useGetState(): ResultsState {
  let { state } = useLocation() as LocationState;

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
      return {
        data: [],
        query: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      data: [],
      query: "",
    };
  }
}

function Results() {
  const { data, query } = useGetState();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [resultsState, setResultsState] = useState<ResultsState>({
    data,
    query,
  });
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
      fetchData(url)
        .then((res) => {
          const body = res.body as Restaurant[];
          setResultsState({ ...resultsState, data: body });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    if (!initialLoad) {
      setIsLoading(true);
      const url = SearchUrl.buildUrl();
      refreshData(url);
    } else {
      setInitialLoad(false);
    }
  }, [currentFilter, query]);

  return (
    <div>
      <SearchBar shouldFetchData={false} />
      <Filter
        filterOptions={filterOptions}
        currentFilter={currentFilter}
        setFilter={setCurrentFilter}
        isLoading={isLoading}
      />
      <div>
        {isLoading ? (
          <Grid />
        ) : (
          <ResultsList data={resultsState.data} query={resultsState.query} />
        )}
      </div>
    </div>
  );
}

export default Results;
