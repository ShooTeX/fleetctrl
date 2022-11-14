import { IoMdArrowRoundDown } from "react-icons/io";
import type { LngLat } from "react-map-gl";
import { Marker } from "react-map-gl";
import type { ButtonGroupProperties } from "../../ButtonGroup";
import { ButtonGroup } from "../../ButtonGroup";

type PopupProperties = {
  buttons: ButtonGroupProperties["buttons"];
  position: LngLat;
};

export const Popup = ({ position, buttons }: PopupProperties) => (
  <>
    <Marker longitude={position.lng} latitude={position.lat} anchor="bottom">
      <IoMdArrowRoundDown className="animate-bounce text-3xl leading-none text-white" />
    </Marker>
    <Marker longitude={position.lng} latitude={position.lat} anchor="top-left">
      <div className="ml-5 -mt-6">
        <ButtonGroup buttons={buttons} />
      </div>
    </Marker>
  </>
);
