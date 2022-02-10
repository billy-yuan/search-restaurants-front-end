export type LatLong = {
  lat: number;
  lng: number;
};

export enum ZoomType {
  ZOOM_IN,
  ZOOM_OUT,
}

export enum MAP_PROPERTIES {
  CENTER = "center",
  ZOOM = "zoom",
}

export type MapProperties = {
  [MAP_PROPERTIES.CENTER]?: LatLong;
  [MAP_PROPERTIES.ZOOM]?: number;
};
