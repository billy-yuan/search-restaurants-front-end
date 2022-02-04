function RestaurantCard({ restaurant }: any) {
  console.log(restaurant);

  return <div>Name: {restaurant.name}</div>;
}

export default RestaurantCard;
