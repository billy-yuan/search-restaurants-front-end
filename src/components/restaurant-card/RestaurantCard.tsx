import { useContext, useState } from "react";
import { stateContext } from "../../utility/context/appState";
import { Article, Restaurant } from "../../utility/types";
import { LinkButton } from "../icons";

import "./style.css";

function makeGoogleMapsUrl(query: string) {
  const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search";
  const parameters = `${query}`.split(" ").join("+");

  return `${GOOGLE_MAPS_SEARCH_URL}/${parameters}`;
}

function formatDate(dateString: string): string | null {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  return `${date.getFullYear()}/${1 + date.getMonth()}/${date.getDate()}`;
}

function Categories({ categories }: { categories: string[] }) {
  if (categories === []) {
    return <></>;
  }
  return <>{categories.join(", ")}</>;
}

function ArticleSection({ articles }: { articles: Article[] }) {
  if (articles === []) {
    return <></>;
  }
  return (
    <>
      {articles.map((article) => {
        const publishedDate = formatDate(article.published_date);

        return (
          <div className="article-link" key={article._id}>
            <a target="_blank" rel="noopener noreferrer" href={article.url}>
              {article.title}
            </a>{" "}
          </div>
        );
      })}
    </>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const googleMapsUrl = makeGoogleMapsUrl(
    `${restaurant.name} ${restaurant.address}`
  );

  const { setSelected } = useContext(stateContext);

  return (
    <div
      className="restaurant-card-container"
      onMouseEnter={() => setSelected(restaurant)}
      onMouseLeave={() => setSelected(null)}
    >
      <div className="restaurant-card-title">{restaurant.name}</div>
      <br />
      <div className="restautant-card-address">{restaurant.address}</div>
      <div className="restaurant-card-details">
        <Categories categories={restaurant.categories} />
        <div>{restaurant.price}</div>
      </div>

      <br />
      <div className="article-section-container">
        <div className="article-section-title">Featured Articles </div>

        <ArticleSection articles={restaurant.articles} />
      </div>
      <br />

      <LinkButton url={googleMapsUrl} displayText="Google Maps" />
    </div>
  );
}

export default RestaurantCard;
