import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FaFlag, FaRoute } from "react-icons/fa";
import type { LngLat } from "react-map-gl";
import Map, { Layer, Source, useMap } from "react-map-gl";
import { lineString } from "@turf/helpers";
import { hhBounds } from "../../../map/hh-bounds";
import { hhFeature } from "../../../map/hh-feature";
import { Actionbar } from "../../Actionbar";
import { Popup } from "../Popup";

export const MapboxMap = () => {
  const { mainMap } = useMap();
  const [showPopup, setShowPopup] = useState<LngLat | false>(false);
  const [customRouteStart, setCustomRouteStart] = useState<LngLat | false>(
    false
  );
  const [customRouteEnd, setCustomRouteEnd] = useState<LngLat | false>(false);
  const [customRoute, setCustomRoute] = useState<LngLat[] | false>(false);

  const customRoutePreview =
    customRouteEnd &&
    customRouteStart &&
    lineString([customRouteStart.toArray(), customRouteEnd.toArray()], {
      id: "customRoutePreview",
    });

  const cancelCustomRoute = (showToast = true) => {
    setCustomRouteStart(false);
    setCustomRouteEnd(false);
    if (showToast) {
      toast.error("Cancelled custom route creation", {
        position: "top-left",
      });
    }
  };

  const createCustomRoute = () => {
    if (showPopup) {
      setCustomRouteStart(showPopup);
    }
    setShowPopup(false);

    toast.custom(
      (t) => (
        <Actionbar
          Icon={FaFlag}
          action={{
            title: "cancel",
            onClick: () => {
              cancelCustomRoute();
              toast.dismiss(t.id);
            },
          }}
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
  };

  const handleMouseClick = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (event.originalEvent.target !== mainMap?.getCanvas()) {
        return;
      }
      if (customRouteStart && customRouteEnd) {
        setCustomRoute([customRouteStart, customRouteEnd]);
        cancelCustomRoute(false);
        toast.success("created route!");
        toast.dismiss("processToast");
        return;
      }

      setShowPopup(event.lngLat);
    },
    [customRouteEnd, customRouteStart, mainMap]
  );

  const handleMouseMove = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (
        event.originalEvent.target !== mainMap?.getCanvas() ||
        !customRouteStart
      ) {
        return;
      }
      setCustomRouteEnd(event.lngLat);
    },
    [customRouteStart, mainMap]
  );

  return (
    <Map
      id="mainMap"
      initialViewState={{
        bounds: hhBounds,
      }}
      dragRotate={false}
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
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
              title: "Create route",
              onClick: createCustomRoute,
              Icon: FaRoute,
            },
          ]}
        />
      )}
      {customRoutePreview && (
        <Source type="geojson" data={customRoutePreview}>
          <Layer
            id="route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "#FFF",
              "line-width": 2,
            }}
          />
        </Source>
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
