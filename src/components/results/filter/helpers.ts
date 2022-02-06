import { Article, Restaurant } from "../../../utility/types";

export function createFilters(data: Restaurant[]) {
  const categories: { [key: string]: string } = {};
  const articles: { [key: string]: Article } = {};

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
  const categoriesOptions = [];

  for (let category of Object.keys(categories)) {
    categoriesOptions.push({ value: category, label: category });
  }

  // make article options into array
  const articlesOptions = [];

  for (let id of Object.keys(articles)) {
    articlesOptions.push({
      value: id,
      label: articles[id].title,
    });
  }

  // consolidate filter options
  return {
    categories: categoriesOptions,
    articles: articlesOptions,
  };
}
