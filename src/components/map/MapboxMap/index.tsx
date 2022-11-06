import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source } from "react-map-gl";
import { hhBounds } from "../../../utils/map/hh-bounds";
import { hhFeature } from "../../../utils/map/hh-feature";

export const MapboxMap = () => {
  return (
    <Map
      id="mainMap"
      initialViewState={{
        bounds: hhBounds,
      }}
      dragRotate={false}
      touchZoomRotate={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      <Source id="hh" type="geojson" data={hhFeature}>
        <Layer
          id="hh-outline"
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{
            "line-color": "#2a9d8f",
            "line-width": 3,
          }}
        />
      </Source>
    </Map>
  );
};
