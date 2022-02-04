import { useLocation } from "react-router-dom";
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
    }
  } catch {
    throw Error("Not an array of objects");
  }
}

function Results() {
  const data = useGetState();
  console.log(data);
  return (
    <div>
      {data.map((value) => (
        <RestaurantCard restaurant={value} />
      ))}
    </div>
  );
}

export default Results;
