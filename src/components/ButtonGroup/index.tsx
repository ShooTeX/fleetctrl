import clsx from "clsx";
import type { DOMAttributes } from "react";
import type { IconType } from "react-icons";

export type ButtonGroupButton = {
  title: string;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  Icon?: never;
};

export type ButtonGroupButtonWithIcon = Omit<ButtonGroupButton, "Icon"> & {
  Icon: IconType;
};

export type ButtonGroupProperties = {
  buttons:
    | [ButtonGroupButton, ...ButtonGroupButton[]]
    | [ButtonGroupButtonWithIcon, ...ButtonGroupButtonWithIcon[]];
};

export const ButtonGroup = ({ buttons }: ButtonGroupProperties) => (
  <div className="divide-y divide-zinc-400 text-white">
    {buttons.map(({ title, onClick, Icon }) => {
      return (
        <button
          onClick={onClick}
          type="button"
          className={clsx(
            "flex items-center",
            "space-x-2 bg-zinc-800 px-4 py-2",
            "transition-all ease-in-out",
            "first:rounded-t-lg last:rounded-b-lg only:rounded-lg",
            "hover:bg-zinc-700"
          )}
        >
          {!!Icon && <Icon className="text-lg text-zinc-400" />}
          <div className="flex flex-col">
            <span className="font-semibold uppercase">{title}</span>
          </div>
        </button>
      );
    })}
  </div>
);
