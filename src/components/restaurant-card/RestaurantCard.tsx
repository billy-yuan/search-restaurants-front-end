import { useContext } from "react";
import { COLOR } from "../../styles/colors";
import { stateContext } from "../../utility/context/appState";
import { makeGoogleMapsUrl } from "../../utility/makeGoogleMapsUrl";
import { Article, Restaurant } from "../../utility/types";
import { LinkButton } from "../icons";

import "./style.css";

const selectedCardStyle = {
  boxShadow: " 0 2px 18px #00000026",
};
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

  const { selected, setSelected } = useContext(stateContext);

  return (
    <div
      className="restaurant-card-container"
      onMouseEnter={() => setSelected(restaurant)}
      onMouseLeave={() => setSelected(null)}
      style={selected?._id === restaurant._id ? selectedCardStyle : {}}
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
