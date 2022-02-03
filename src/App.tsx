import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Results from "./components/results/Results";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
