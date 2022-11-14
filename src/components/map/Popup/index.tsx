import { IoMdArrowRoundDown } from "react-icons/io";
import type { LngLat } from "react-map-gl";
import { Marker } from "react-map-gl";
import { FaUserPlus } from "react-icons/fa";
import { ButtonGroup } from "../../ButtonGroup";

interface PopupProperties {
  position: LngLat;
}

export const Popup = ({ position }: PopupProperties) => (
  <>
    <Marker longitude={position.lng} latitude={position.lat} anchor="bottom">
      <IoMdArrowRoundDown className="animate-bounce text-3xl leading-none text-white" />
    </Marker>
    <Marker longitude={position.lng} latitude={position.lat} anchor="top-left">
      <div className="ml-5 -mt-6">
        <ButtonGroup
          buttons={[{ title: "hello", onClick: console.log, Icon: FaUserPlus }]}
        />
      </div>
    </Marker>
  </>
);
