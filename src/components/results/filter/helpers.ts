import { Article, Price, Restaurant } from "../../../utility/types";
import { FilterOption } from "./Filter";

export function createFilters(data: Restaurant[]) {
  const categories: { [key: string]: string } = {};
  const articles: { [key: string]: Article } = {};
  const prices: { [key: string]: Price } = {
    [Price.$]: Price.$,
    [Price.$$]: Price.$$,
    [Price.$$$]: Price.$$$,
    [Price.$$$$]: Price.$$$$,
  };

  // TODO: Have back end do this. https://github.com/billy-yuan/search-restaurants-front-end/issues/8
  for (let restaurant of data) {
    // get unique categories
    for (let category of restaurant.categories) {
      categories[category] = category;
    }
    // get unique articles
    for (let article of restaurant.articles) {
      articles[article._id] = article;
    }
  }

  // make category options into array
  const categoriesOptions: FilterOption[] = [];

  for (let category of Object.keys(categories)) {
    categoriesOptions.push({ value: category, label: category });
  }

  // make article options into array
  const articlesOptions: FilterOption[] = [];

  for (let id of Object.keys(articles)) {
    articlesOptions.push({
      value: id,
      label: articles[id].title,
    });
  }

  // make price options into array
  const priceOptions: FilterOption[] = [];
  for (let price of Object.keys(prices)) {
    priceOptions.push({
      value: price,
      label: price,
    });
  }

  // consolidate filter options
  return {
    categories: categoriesOptions,
    articles: articlesOptions,
    price: priceOptions,
  };
}
