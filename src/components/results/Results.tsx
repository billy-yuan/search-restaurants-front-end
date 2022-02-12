import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utility/api";
import { createFilters } from "./filter/helpers";
import { Restaurant } from "../../utility/types";
import SearchBar from "../search-bar";
import { Grid } from "react-loader-spinner";
import { stateContext } from "../../utility/context/appState";
import "./style.css";
import ResultsMap from "../map/ResultsMap";
import { useMapBoundsToString } from "./utility";
import { buildFetchDataUrl } from "./helper";
import { Logo } from "../logo";

export type CurrentFilter = {
  [key: string]: string[];
};

const defaultFilter = {
  articles: [],
  categories: [],
  price: [],
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
  const {
    map,
    shouldFetchData,
    setShouldFetchData,
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
  } = useContext(stateContext);

  const [currentFilter, setCurrentFilter] =
    useState<CurrentFilter>(defaultFilter);
  const mapBounds = useMapBoundsToString(map);
  const navigate = useNavigate();
  const location = useLocation();

  if (!dataState.data) {
    return <Navigate to="/" />;
  }
  const filterOptions = createFilters(dataState.data);

  const refreshData = async () => {
    // Create URL
    const url = buildFetchDataUrl(
      dataState.query,
      currentFilter,
      mapBounds,
      location.search
    );

    fetchData(url.buildUrl())
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

  // Refresh data in all other cases (i.e. click on )
  useEffect(() => {
    if (shouldFetchData) {
      setIsLoading(true);
      refreshData();
    }
    return () => setShouldFetchData(false);
  }, [shouldFetchData]);

  // Refresh data when query params change
  useEffect(() => {
    setIsLoading(true);
    refreshData();
  }, [location.search]);

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="results-header-top-row">
          <div className="results-header-logo">
            <Logo onClick={() => navigate("/")} />
          </div>
          <div className="results-header-search">
            <SearchBar callback={() => setCurrentFilter(defaultFilter)} />
          </div>
        </div>
        <Filter
          filterOptions={filterOptions}
          currentFilter={currentFilter}
          setFilter={setCurrentFilter}
          isLoading={isLoading}
          onChange={() => setShouldFetchData(true)}
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
