import { toGeoJSON } from "@mapbox/polyline";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import Map, { Layer, Source, useMap } from "react-map-gl";
import { hhBounds } from "../../../utils/map/hh-bounds";
import { hhFeature } from "../../../utils/map/hh-feature";
import { trpc } from "../../../utils/trpc";

export const MapboxMap = () => {
  const { mainMap } = useMap();
  const { data } = trpc.example.getDirections.useQuery({
    waypoints: [
      { coordinates: [9.977_83, 53.549_121] },
      { coordinates: [9.997_255, 53.547_294] },
    ],
  });
  const route =
    !!data?.routes[0]?.geometry && toGeoJSON(data.routes[0].geometry);

  useEffect(() => {
    mainMap?.on("click", "route", () => {
      if (route) {
        const { coordinates } = route;
        if (coordinates[0]) {
          const bounds = new mapboxgl.LngLatBounds(
            coordinates[0] as [number, number],
            coordinates[0] as [number, number]
          );

          coordinates.map((coord) => bounds.extend(coord as [number, number]));

          mainMap?.fitBounds(bounds, { padding: 20 });
        }
      }
    });
  }, [mainMap, route]);

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
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{
            "line-color": "#2a9d8f",
            "line-width": 3,
          }}
        />
      </Source>
      {!!route && (
        <Source id="route" type="geojson" data={route}>
          <Layer
            id="route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "#FFF",
              "line-width": 5,
            }}
          />
        </Source>
      )}
    </Map>
  );
};
