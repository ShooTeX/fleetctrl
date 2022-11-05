import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = "";
export const MapboxMap = () => {
  const [, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // eslint-disable-next-line unicorn/no-useless-undefined
    if (typeof window === "undefined" || node === null) return undefined;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} className="h-full w-full" />;
};
