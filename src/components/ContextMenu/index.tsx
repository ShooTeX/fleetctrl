import clsx from "clsx";
import { FaThumbsUp } from "react-icons/fa";

export const ContextMenu = () => (
  <div className="divide-y divide-zinc-400 text-white">
    {/*
    <div className="flex items-center space-x-2 p-3 text-white">
      <FaPlus className="text-xl" />
      <div className="flex flex-col leading-snug">
        <span>Menu Title</span>
        <span className="text-zinc-400">Menu Description</span>
      </div>
    </div>
  */}
    <div
      className={clsx(
        "flex items-center",
        "space-x-2 bg-zinc-800 px-4 py-2",
        "transition-all ease-in-out",
        "first:rounded-t-lg last:rounded-t-lg only:rounded-lg",
        "hover:bg-zinc-700",
      )}
    >
      <FaThumbsUp className="text-zinc-400" />
      <div className="flex flex-col">
        <span>Menu Title</span>
      </div>
    </div>
  </div>
);
