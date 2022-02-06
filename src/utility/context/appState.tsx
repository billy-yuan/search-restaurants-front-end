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
};

function StateContext() {
  return createContext<AppState>({
    dataState: { query: "", data: [] },
    setDataState: () => null,
    isLoading: false,
    setIsLoading: () => null,
  });
}

export const stateContext = StateContext();

export function StateContextProvider({ children }: any) {
  const [dataState, setDataState] = useState<ResultsState>({
    query: "",
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appState: AppState = {
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
  };

  return (
    <stateContext.Provider value={appState}>{children}</stateContext.Provider>
  );
}
