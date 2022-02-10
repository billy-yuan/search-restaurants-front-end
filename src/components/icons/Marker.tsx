import { COLOR } from "../../styles/colors";

export const unselectedMarker = {
  path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
  border: COLOR.MARKER,
  fillOpacity: 0.2,
  strokeWeight: 1,
  rotation: 0,
  scale: 1,
};

export const selectedMarker = {
  ...unselectedMarker,
  fillColor: COLOR.MARKER,
  fillOpacity: 1,
};
