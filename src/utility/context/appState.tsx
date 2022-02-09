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
};

function StateContext() {
  return createContext<AppState>({
    dataState: { query: "", data: [] },
    setDataState: () => null,
    isLoading: false,
    setIsLoading: () => null,
    map: null,
    setMap: () => null,
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

  const appState: AppState = {
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
    map,
    setMap,
  };

  return (
    <stateContext.Provider value={appState}>{children}</stateContext.Provider>
  );
}

export { stateContext, StateContextProvider };
