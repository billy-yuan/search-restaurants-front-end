function Categories({ categories }: { categories: string[] }) {
  if (categories === []) {
    return <></>;
  }
  return <>{categories.join(", ")}</>;
}

function Article({ articles }: { articles: any[] }) {
  if (articles === []) {
    return <></>;
  }
  return (
    <>
      {articles.map((article) => {
        return (
          <div key={article._id}>
            <a target="_blank" rel="noopener noreferrer" href={article.url}>
              {article.title}
            </a>
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
        <Article articles={restaurant.articles} />
      </div>
    </div>
  );
}

export default RestaurantCard;
