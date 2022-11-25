import { TiLocationArrow } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";
import { MdFlag, MdPersonPinCircle } from "react-icons/md";
import type { LngLat } from "react-map-gl";
import { Layer, Marker, Source } from "react-map-gl";
import { toGeoJSON } from "@mapbox/polyline";
import { calcBearing } from "../../../utils/calc-bearing";
import { trpc } from "../../../utils/trpc";

export const CustomRoute = ({
  coordinates,
}: {
  coordinates: [LngLat, LngLat];
}) => {
  const { data } = trpc.example.getDirections.useQuery(
    {
      waypoints: [
        {
          coordinates: coordinates[0].toArray() as [number, number],
        },
        {
          coordinates: coordinates[1].toArray() as [number, number],
        },
      ],
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
    }
  );
  const route =
    !!data?.routes[0]?.geometry && toGeoJSON(data.routes[0].geometry);

  // TODO: check how to early return in jsx without using null;
  if (!route) return <div />;
  return (
    <>
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
      <Marker
        latitude={route.coordinates?.[0]?.[1]}
        longitude={route.coordinates?.[0]?.[0]}
        anchor="bottom"
      >
        <MdPersonPinCircle className="text-3xl text-white" />
      </Marker>
      <Marker
        longitude={route.coordinates?.at(-1)?.[0]}
        latitude={route.coordinates?.at(-1)?.[1]}
        anchor="bottom-left"
      >
        <MdFlag className="text-3xl text-white" />
      </Marker>
      <Marker
        latitude={route.coordinates?.at(route.coordinates.length / 2)?.[1]}
        longitude={route.coordinates?.at(route.coordinates.length / 2)?.[0]}
        anchor="center"
        rotation={calcBearing({
          start: [
            route.coordinates?.at(route.coordinates.length / 2 - 1)?.[1] ?? 0,
            route.coordinates?.at(route.coordinates.length / 2 - 1)?.[0] ?? 0,
          ],
          destination: [
            route.coordinates?.at(route.coordinates.length / 2)?.[1] ?? 0,
            route.coordinates?.at(route.coordinates.length / 2)?.[0] ?? 0,
          ],
        })}
      >
        <div className="relative">
          <TiLocationArrow className="absolute inset-0 m-auto -rotate-45 text-2xl text-slate-100" />
          <FaCircle className="text-3xl text-slate-500" />
        </div>
      </Marker>
    </>
  );
};
