import { createContext, useState } from "react";
import { Restaurant } from "../types";

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
  shouldFetchData: boolean;
  setShouldFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Restaurant | null;
  setSelected: React.Dispatch<React.SetStateAction<Restaurant | null>>;
};

function StateContext() {
  return createContext<AppState>({
    dataState: { query: "", data: [] },
    setDataState: () => null,
    isLoading: false,
    setIsLoading: () => null,
    map: null,
    setMap: () => null,
    shouldFetchData: false,
    setShouldFetchData: () => null,
    selected: null,
    setSelected: () => null,
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
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const appState: AppState = {
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
    map,
    setMap,
    shouldFetchData,
    setShouldFetchData,
    selected,
    setSelected,
  };

  return (
    <stateContext.Provider value={appState}>{children}</stateContext.Provider>
  );
}

export { stateContext, StateContextProvider };
