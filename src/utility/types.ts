export enum Price {
  "$" = "$",
  "$$" = "$$",
  "$$$" = "$$$",
  "$$$$" = "$$$$",
}

export type Restaurant = {
  _id: string;
  name: string;
  address: string;
  articles: Article[];
  categories: string[];
  price: Price | null;
  coordinates: { latitude: number; longitude: number };
};

export type Article = {
  _id: string;
  title: string;
  url: string;
  published_date: string;
};

export type CurrentFilter = {
  [key: string]: string[];
};
