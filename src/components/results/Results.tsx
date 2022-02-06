import { Navigate, useLocation } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utility/api";
import { BASE_URL, SEARCH_ENDPOINT } from "../../utility/api/endpoints";
import { createFilters } from "./filter/helpers";
import UrlBuilder from "../../utility/urlBuilder";
import { Restaurant } from "../../utility/types";
import SearchBar from "../search-bar";
import { Grid } from "react-loader-spinner";
import { StateContext } from "../../App";

type CurrentFilter = {
  [key: string]: string[];
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

function Results() {
  const { dataState, setDataState, isLoading, setIsLoading } =
    useContext(StateContext);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>({
    articles: [],
    categories: [],
  });

  if (!dataState.data) {
    return <Navigate to="/" />;
  }

  const filterOptions = createFilters(dataState.data);

  // Refetch data when filters change
  useEffect(() => {
    // Create URL
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [dataState.query]);
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
          setDataState({ ...dataState, data: body });
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
  }, [currentFilter]);

  return (
    <div>
      <SearchBar />
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
          <ResultsList data={dataState.data} query={dataState.query} />
        )}
      </div>
    </div>
  );
}

export default Results;
