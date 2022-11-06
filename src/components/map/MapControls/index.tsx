import { useMap } from "react-map-gl";
import { hhBounds } from "../../../utils/map/hh-bounds";
import { Button } from "../../Button";

export const MapControls = () => {
  const { mainMap } = useMap();

  const onRecenter = () => {
    mainMap?.fitBounds(hhBounds);
  };

  return (
    <div>
      <Button onClick={onRecenter}>recenter</Button>
    </div>
  );
};
