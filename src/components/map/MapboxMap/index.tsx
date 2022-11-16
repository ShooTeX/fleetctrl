import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineAddLocation } from "react-icons/md";
import type { LngLat } from "react-map-gl";
import Map, { Layer, Source, useMap } from "react-map-gl";
import { hhBounds } from "../../../map/hh-bounds";
import { hhFeature } from "../../../map/hh-feature";
import { Actionbar } from "../../Actionbar";
import { Popup } from "../Popup";

export const MapboxMap = () => {
  const { mainMap } = useMap();
  const [showPopup, setShowPopup] = useState<LngLat | false>(false);

  useEffect(() => {
    toast.custom(
      (t) => (
        <Actionbar
          Icon={MdOutlineAddLocation}
          action={{ title: "cancel", onClick: () => toast.dismiss(t.id) }}
        >
          Set a destination point
        </Actionbar>
      ),
      {
        duration: Number.POSITIVE_INFINITY,
        position: "top-center",
        id: "processToast",
      }
    );
  }, []);

  const onMapLoad = useCallback(() => {
    mainMap?.on("click", (event) => {
      if (event.originalEvent.target !== mainMap.getCanvas()) return;
      setShowPopup(event.lngLat);
    });
  }, [mainMap]);

  return (
    <Map
      id="mainMap"
      initialViewState={{
        bounds: hhBounds,
      }}
      dragRotate={false}
      onLoad={onMapLoad}
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
      {showPopup && (
        <Popup
          position={showPopup}
          buttons={[
            {
              title: "hello",
              onClick: console.log,
              Icon: FaUserPlus,
            },
          ]}
        />
      )}
      {/* !!route && (
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
                route.coordinates?.at(route.coordinates.length / 2 - 1)?.[1] ??
                  0,
                route.coordinates?.at(route.coordinates.length / 2 - 1)?.[0] ??
                  0,
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
      ) */}
    </Map>
  );
};
