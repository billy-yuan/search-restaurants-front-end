import { useContext, useEffect } from "react";
import { stateContext } from "../../utility/context/appState";
import SearchBar from "../search-bar";
import "./style.css";
function Home() {
  const { setDataState } = useContext(stateContext);

  // Reset data state when home page loads
  useEffect(() => {
    setDataState({ query: "", data: [] });
  }, []);

  return (
    <div className="home-search-container">
      <SearchBar />
    </div>
  );
}

export default Home;
