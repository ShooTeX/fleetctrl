import { MapProvider } from "react-map-gl";
import { MapboxMap } from ".";

export default {
  title: "Components / Map",
};

export const Story = () => (
  <MapProvider>
    <MapboxMap />
  </MapProvider>
);

Story.storyName = "MapboxMap";
