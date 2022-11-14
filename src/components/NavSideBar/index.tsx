import { AiFillCar } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export const NavSideBar = () => {
  return (
    <div className="flex h-full flex-col bg-zinc-800 p-4 text-lg text-zinc-400">
      <div className="flex-1 space-y-5">
        <AiFillCar />
        <BsPeopleFill />
      </div>
      <div className="space-y-5">
        <MdAccountCircle />
        <FaCog />
      </div>
      <div />
    </div>
  );
};
