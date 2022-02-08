import { Article, Restaurant } from "../../utility/types";
import "./style.css";

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
            <span>{publishedDate}</span>
          </div>
        );
      })}
    </>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="restaurant-card-container">
      <div className="restaurant-card-title">{restaurant.name}</div>
      <br />
      <div className="restautant-card-address">{restaurant.address}</div>
      <Categories categories={restaurant.categories} />
      <div>{restaurant.price}</div>
      <br />
      <div className="article-section-container">
        <div className="article-section-title">Featured Articles </div>

        <ArticleSection articles={restaurant.articles} />
      </div>
    </div>
  );
}

export default RestaurantCard;
