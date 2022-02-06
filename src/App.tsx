import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Results from "./components/results/Results";
import { StateContextProvider } from "./utility/context/appState";

function App() {
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
