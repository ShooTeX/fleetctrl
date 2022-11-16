import clsx from "clsx";
import type { IconType } from "react-icons";
import { IoClose } from "react-icons/io5";

type SnackbarProperties = {
  Icon?: IconType;
  className?: string;
  children: string;
  action?: {
    title: string;
    onClick: () => void;
  };
};

export const Actionbar = ({
  Icon,
  className,
  children,
  action,
}: SnackbarProperties) => {
  return (
    <div
      className={clsx(
        "flex cursor-default",
        "rounded-3xl bg-zinc-800",
        "py-2 text-white drop-shadow-xl",
        className
      )}
    >
      <div className="flex items-center space-x-2 px-5">
        {!!Icon && <Icon className="text-lg text-zinc-400" />}
        <span className="leading-none">{children}</span>
      </div>
      {!!action && (
        <button
          type="button"
          onClick={action.onClick}
          className="flex items-center pr-3 text-red-400"
        >
          <IoClose />
        </button>
      )}
    </div>
  );
};
