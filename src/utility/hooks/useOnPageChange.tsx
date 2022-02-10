import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { stateContext } from "../context/appState";

export function useOnPageChange() {
  const location = useLocation();
  const { setMap } = useContext(stateContext);

  useEffect(() => {
    setMap(null);
  }, [location.pathname]);
}
