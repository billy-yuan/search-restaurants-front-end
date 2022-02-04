import { Navigate, useLocation } from "react-router-dom";
import RestaurantCard from "../restaurant-card";

function useGetState(): any[] {
  let { state } = useLocation();
  try {
    if (
      state !== null &&
      state !== undefined &&
      typeof state === "object" &&
      typeof state.query === "string" &&
      state.data.constructor === [].constructor
    ) {
      return state;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

function Results() {
  // const data = useGetState();
  const { data, query } = useGetState();

  if (!data) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {`Showing ${data.length} results for "${query}"`}
      {data.map((value) => (
        <RestaurantCard key={value._id} restaurant={value} />
      ))}
    </div>
  );
}

export default Results;
