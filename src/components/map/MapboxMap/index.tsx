import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source } from "react-map-gl";
import { hhFeature } from "../../../utils/map/hh-feature";

export const MapboxMap = () => {
  return (
    <Map
      initialViewState={{
        bounds: [
          [9.729_561, 53.762_799],
          [10.338_187, 53.383_792],
        ],
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
