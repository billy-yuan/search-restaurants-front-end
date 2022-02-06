import { Article } from "../../utility/types";

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
          <div key={article._id}>
            <a target="_blank" rel="noopener noreferrer" href={article.url}>
              {article.title}
            </a>
            <span>{publishedDate}</span>
          </div>
        );
      })}
    </>
  );
}

function RestaurantCard({ restaurant }: any) {
  return (
    <div style={{ margin: "20px" }}>
      <div>Name: {restaurant.name}</div>
      <div>Address: {restaurant.address}</div>
      <div>
        <Categories categories={restaurant.categories} />
      </div>
      <div>{restaurant.price}</div>
      <div>
        <ArticleSection articles={restaurant.articles} />
      </div>
    </div>
  );
}

export default RestaurantCard;
