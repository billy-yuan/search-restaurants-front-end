import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useOnPageChange(callback: () => void) {
  const location = useLocation();

  useEffect(() => {
    callback();
  }, [location.pathname]);
}
