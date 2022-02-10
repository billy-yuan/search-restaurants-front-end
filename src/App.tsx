import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Results from "./components/results/Results";
import { stateContext, StateContextProvider } from "./utility/context/appState";
import { useOnPageChange } from "./utility/hooks";

function App() {
  const { setMap } = useContext(stateContext);

  const onPageChange = () => {
    // Reset map every time user changes page
    setMap(null);
  };

  useOnPageChange(() => onPageChange());

  return (
    <StateContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </StateContextProvider>
  );
}

export default App;
