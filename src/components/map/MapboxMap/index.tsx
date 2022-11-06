import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { initMap } from "../../../utils/map/init-map";

mapboxgl.accessToken = "";
export const MapboxMap = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);

  useEffect(() => {
    if (mapNode.current && !map) {
      const mapboxMap = new mapboxgl.Map({
        container: mapNode.current,
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        style: "mapbox://styles/mapbox/dark-v10",
        // center: [9.993_682, 53.551_086],
        // zoom: 9,
        bounds: [
          [9.729_561, 53.762_799],
          [10.338_187, 53.383_792],
        ],
      });
      initMap(mapboxMap);
      setMap(mapboxMap);
    }

    return () => {
      map?.remove();
    };
  }, [map]);

  return <div ref={mapNode} className="h-full w-full" />;
};
