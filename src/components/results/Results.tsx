import { Navigate } from "react-router-dom";
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
import { stateContext } from "../../utility/context/appState";
import "./style.css";
import ResultsMap from "../map/ResultsMap";
import { useMapBoundsToString } from "./utility";

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
    useContext(stateContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>({
    articles: [],
    categories: [],
    price: [],
  });
  const mapBounds = useMapBoundsToString();

  if (!dataState.data) {
    return <Navigate to="/" />;
  }

  const filterOptions = createFilters(dataState.data);

  // Refetch data when filters change
  useEffect(() => {
    // Create URL
    const SearchUrl = new UrlBuilder(`${BASE_URL}${SEARCH_ENDPOINT}`);
    SearchUrl.addQueryParameter("q", [dataState.query]);

    if (mapBounds) {
      SearchUrl.addQueryParameter("ne_bound", [mapBounds.ne]).addQueryParameter(
        "sw_bound",
        [mapBounds.sw]
      );
    }

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
          let body: Restaurant[] = [];
          if (res.status === 200) {
            body = res.body ? (res.body as Restaurant[]) : [];
          }
          setDataState({ ...dataState, data: body });
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
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
    <div className="results-container">
      <div className="results-header">
        <div className="results-header-search">
          <SearchBar />
        </div>
        <Filter
          filterOptions={filterOptions}
          currentFilter={currentFilter}
          setFilter={setCurrentFilter}
          isLoading={isLoading}
        />
      </div>
      <div className="results-content-container">
        <div className="sidebar-container">
          {isLoading ? (
            <Grid />
          ) : (
            <ResultsList data={dataState.data} query={dataState.query} />
          )}
        </div>
        <div className="map-container">
          <ResultsMap data={dataState.data} />
        </div>
      </div>
    </div>
  );
}

export default Results;
