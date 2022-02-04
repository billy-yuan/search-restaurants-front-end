import { Navigate, useLocation } from "react-router-dom";
import RestaurantCard from "../restaurant-card";

function useGetState(): any[] {
  let { state } = useLocation();

  try {
    if (
      state !== null &&
      state !== undefined &&
      typeof state === "object" &&
      state.constructor === [].constructor
    ) {
      return state;
    } else {
      throw Error("Not an array of objects");
    }
  } catch (e) {
    console.log(e);
  }
}

function Results() {
  const data = useGetState();

  if (!data) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      Results
      {data.map((value) => (
        <RestaurantCard restaurant={value} />
      ))}
    </div>
  );
}

export default Results;
