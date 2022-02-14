import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utility/api";
import { createFilters } from "./filter/helpers";
import { Restaurant } from "../../utility/types";
import SearchBar from "../search-bar";
import { Grid } from "react-loader-spinner";
import { defaultFilter, stateContext } from "../../utility/context/appState";
import "./style.css";
import ResultsMap from "../map/ResultsMap";
import { buildFetchDataUrl, buildFetchDataUrlFromSearchParams } from "./helper";
import { Logo } from "../logo";
import { defaultMapBounds, mapBoundsToString } from "./utility";
import { FETCH_DATA_ACTION_TYPE } from "../../utility/context/reducers/fetchDataReducer";

function getFiltersFromUrl() {
  const parsedUrl = new URL(window.location.href);
  let articleFilter = parsedUrl.searchParams.get("articles")?.split(",");
  let priceFilter = parsedUrl.searchParams.get("price")?.split(",");
  let categoryFilter = parsedUrl.searchParams.get("categories")?.split(",");

  articleFilter = articleFilter ? articleFilter : [];
  priceFilter = priceFilter ? priceFilter : [];
  categoryFilter = categoryFilter ? categoryFilter : [];

  return {
    articleFilter,
    priceFilter,
    categoryFilter,
  };
}
function geoParamsExist(): boolean {
  const parsedUrl = new URL(window.location.href);
  const neBound = parsedUrl.searchParams.get("ne_bound");
  const swBound = parsedUrl.searchParams.get("sw_bound");

  if (neBound && swBound) {
    return true;
  }
  return false;
}

function getSearchQuery() {
  const parsedUrl = new URL(window.location.href);
  let searchQuery = parsedUrl.searchParams.get("q");
  return searchQuery ? searchQuery : "";
}
function ResultsList({ data }: { data: Restaurant[] }) {
  const searchQuery = getSearchQuery();
  return (
    <>
      {`Showing ${data.length} results for "${searchQuery}"`}
      {data.map((value) => (
        <RestaurantCard key={value._id} restaurant={value} />
      ))}
    </>
  );
}

function Results() {
  const {
    map,
    searchQuery,
    setSearchQuery,
    currentFilter,
    setCurrentFilter,
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
    fetchDataState,
    fetchDataDispatch,
  } = useContext(stateContext);

  const navigate = useNavigate();
  const location = useLocation();

  if (!dataState.data) {
    return <Navigate to="/" />;
  }
  const filterOptions = createFilters(dataState.data);

  const addGeoToUrlAndRedirect = () => {
    const currentParams = location.search;
    const neBoundParam = encodeURIComponent(`${defaultMapBounds.ne}`);
    const seBoundParam = encodeURIComponent(`${defaultMapBounds.sw}`);

    const params = `${currentParams}&ne_bound=${neBoundParam}&se_bound=${seBoundParam}`;
    navigate(`/results${params}`);
  };

  // add map bounds if they don't exist in URL
  useEffect(() => {
    if (!geoParamsExist()) {
      addGeoToUrlAndRedirect();
    }
    // get filters from URL
    const { articleFilter, priceFilter, categoryFilter } = getFiltersFromUrl();
    setCurrentFilter({
      ...currentFilter,
      articles: articleFilter,
      price: priceFilter,
      categories: categoryFilter,
    });

    fetchDataDispatch({ type: FETCH_DATA_ACTION_TYPE.FETCH_DATA });
  }, []);

  const refreshData = async () => {
    // Create URL
    const url = buildFetchDataUrlFromSearchParams(location.search);
    fetchData(url)
      .then((res) => {
        let body: Restaurant[] = [];
        if (res.status === 200) {
          body = res.body ? (res.body as Restaurant[]) : [];
        }
        setDataState({ ...dataState, data: body });
        setIsLoading(false);
        // Reset filter if no data is found
        if (body.length === 0) {
          setCurrentFilter(defaultFilter);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  // Refresh data when query params change
  useEffect(() => {
    // We need to check that a map exists before pulling data
    // or else the data will be fetched twice.
    // When the map loads, the mapBounds URL params are updated, which would
    // trigger this useEffect.
    if (map && fetchDataState.shouldFetchData) {
      setIsLoading(true);
      refreshData();
    }
    return () => {
      fetchDataDispatch({ type: FETCH_DATA_ACTION_TYPE.NO_FETCH_DATA });
    };
  }, [fetchDataState.fetchData]);

  // Update searchQuery based on url param
  useEffect(() => {
    if (searchQuery === "") {
      const parsedUrl = new URL(window.location.href);
      const q = parsedUrl.searchParams.get("q");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

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
        <Filter filterOptions={filterOptions} isLoading={isLoading} />
      </div>
      <div className="results-content-container">
        <div className="sidebar-container">
          {isLoading ? <Grid /> : <ResultsList data={dataState.data} />}
        </div>
        <div className="map-container">
          <ResultsMap data={dataState.data} />
        </div>
      </div>
    </div>
  );
}

export default Results;
