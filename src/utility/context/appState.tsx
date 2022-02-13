import { createContext, useReducer, useState } from "react";
import { CurrentFilter, Restaurant } from "../types";
import {
  fetchDataReducer,
  initialFetchDataState,
  FetchDataState,
  FetchDataAction,
} from "./reducers/fetchDataReducer";

type ResultsState = {
  query: string;
  data: Restaurant[];
};

export type AppState = {
  dataState: ResultsState;
  setDataState: React.Dispatch<React.SetStateAction<ResultsState>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  selected: Restaurant | null;
  setSelected: React.Dispatch<React.SetStateAction<Restaurant | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: CurrentFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<CurrentFilter>>;
  initialLoad: boolean;
  setInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDataState: FetchDataState;
  fetchDataDispatch: React.Dispatch<FetchDataAction>;
};

const defaultFilter = {
  articles: [],
  categories: [],
  price: [],
};

function StateContext() {
  return createContext<AppState>({
    dataState: { query: "", data: [] },
    setDataState: () => null,
    isLoading: false,
    setIsLoading: () => null,
    map: null,
    setMap: () => null,
    selected: null,
    setSelected: () => null,
    searchQuery: "",
    setSearchQuery: () => null,
    currentFilter: defaultFilter,
    setCurrentFilter: () => null,
    initialLoad: true,
    setInitialLoad: () => null,
    fetchDataState: initialFetchDataState,
    fetchDataDispatch: () => null,
  });
}

const stateContext = StateContext();

function StateContextProvider({ children }: any) {
  const [dataState, setDataState] = useState<ResultsState>({
    query: "",
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentFilter, setCurrentFilter] =
    useState<CurrentFilter>(defaultFilter);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [fetchDataState, fetchDataDispatch] = useReducer(
    fetchDataReducer,
    initialFetchDataState
  );

  const appState: AppState = {
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
    map,
    setMap,
    selected,
    setSelected,
    searchQuery,
    setSearchQuery,
    currentFilter,
    setCurrentFilter,
    initialLoad,
    setInitialLoad,
    fetchDataState,
    fetchDataDispatch,
  };

  return (
    <stateContext.Provider value={appState}>{children}</stateContext.Provider>
  );
}

export { defaultFilter, stateContext, StateContextProvider };
