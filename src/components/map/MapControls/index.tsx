import { useMap } from "react-map-gl";
import { BiCurrentLocation } from "react-icons/bi";
import { hhBounds } from "../../../map/hh-bounds";
import { Button } from "../../Button";

export const MapControls = () => {
  const { mainMap } = useMap();

  const onRecenter = () => {
    mainMap?.fitBounds(hhBounds);
  };

  return (
    <div>
      <Button onClick={onRecenter} Icon={BiCurrentLocation}>
        recenter
      </Button>
    </div>
  );
};
