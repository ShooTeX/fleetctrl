import { hhPosition } from "./hh-postion";

export const hhFeature: GeoJSON.Feature = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: hhPosition,
  },
};
