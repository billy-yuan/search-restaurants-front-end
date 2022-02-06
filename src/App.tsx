import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Results from "./components/results/Results";
import { Restaurant } from "./utility/types";

type ResultsState = {
  query: string;
  data: Restaurant[];
};
export const StateContext = createContext(null);
function App() {
  const [dataState, setDataState] = useState<ResultsState>({
    query: "",
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultState = {
    dataState,
    setDataState,
    isLoading,
    setIsLoading,
  };

  return (
    <StateContext.Provider value={defaultState}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </StateContext.Provider>
  );
}

export default App;
