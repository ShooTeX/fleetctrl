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
import { CustomRoute } from "../CustomRoute";

export const MapboxMap = () => {
  const { mainMap } = useMap();
  // TODO: use undefined instead of false for states
  const [showPopup, setShowPopup] = useState<LngLat | false>(false);
  const [customRouteStart, setCustomRouteStart] = useState<LngLat | false>(
    false
  );
  const [customRouteEnd, setCustomRouteEnd] = useState<LngLat | false>(false);
  const [customRoute, setCustomRoute] = useState<[LngLat, LngLat] | false>(
    false
  );

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
            id="custom-route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "#FFF",
              "line-width": 2,
            }}
          />
        </Source>
      )}
      {customRoute && <CustomRoute coordinates={customRoute} />}
    </Map>
  );
};
