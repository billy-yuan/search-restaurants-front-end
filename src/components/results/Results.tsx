import { Navigate, useLocation } from "react-router-dom";
import Filter from "./filter";
import RestaurantCard from "../restaurant-card";

function useGetState(): { data: object[]; query: string } | null {
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
  const { data, query } = useGetState();

  if (!data) {
    return <Navigate to="/" />;
  }

  const categories = {};
  const articles = {};

  // get unique categories + articles
  for (let restaurant of data) {
    for (let category of restaurant.categories) {
      categories[category] = category;
    }
    for (let article of restaurant.articles) {
      articles[article._id] = article;
    }
  }

  // make options into array
  const categoriesOptions = [];
  for (let category of Object.keys(categories)) {
    categoriesOptions.push({ value: category, display: category });
  }

  const articlesOptions = [];

  for (let id of Object.keys(articles)) {
    articlesOptions.push({
      value: id,
      display: articles[id].title,
    });
  }

  // consolidate filter options
  const filterOptions = [
    { dropdownName: "category", options: categoriesOptions },
    { dropdownName: "articles", options: articlesOptions },
  ];
  return (
    <div>
      <Filter filterOptions={filterOptions} />
      {`Showing ${data.length} results for "${query}"`}
      {data.map((value) => (
        <RestaurantCard key={value._id} restaurant={value} />
      ))}
    </div>
  );
}

export default Results;
