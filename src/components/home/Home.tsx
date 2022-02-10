import { useContext, useEffect } from "react";
import { stateContext } from "../../utility/context/appState";
import { Logo } from "../logo";
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
      <Logo cursorToPointer={false} />
      <div className="home-search-about-header">
        <h3>
          Search through Eater NY's featured restaurants and plan your next
          meal.
        </h3>
      </div>
      <SearchBar />
    </div>
  );
}

export default Home;
