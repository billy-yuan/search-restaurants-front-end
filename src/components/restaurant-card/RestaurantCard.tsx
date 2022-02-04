function Categories({ categories }: { categories: string[] }) {
  if (categories === []) {
    return <></>;
  }
  return <>{categories.join(" ")}</>;
}

function RestaurantCard({ restaurant }: any) {
  console.log(restaurant);

  restaurant.categories = ["Peruvian", "Bacon"];
  return (
    <div style={{ margin: "20px" }}>
      <div>Name: {restaurant.name}</div>
      <div>Address: {restaurant.address}</div>
      <div>
        <Categories categories={restaurant.categories} />
      </div>
      <div>{restaurant.price}</div>
    </div>
  );
}

export default RestaurantCard;
