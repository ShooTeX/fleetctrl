import clsx from "clsx";
import type { IconType } from "react-icons";

type SnackbarProperties = {
  Icon?: IconType;
  className?: string;
  children: string;
  action?: {
    title: string;
    onClick: () => void;
  };
};

export const Snackbar = ({
  Icon,
  className,
  children,
  action,
}: SnackbarProperties) => {
  return (
    <div
      className={clsx(
        "flex cursor-default divide-x-2",
        "rounded-md bg-emerald-600",
        "py-3 text-white drop-shadow-lg",
        className
      )}
    >
      <div className="flex items-center space-x-2 px-5">
        {!!Icon && <Icon className="text-lg text-emerald-100" />}
        <span>{children}</span>
      </div>
      {!!action && (
        <button
          type="button"
          onClick={action.onClick}
          className="px-3 font-bold"
        >
          {action.title}
        </button>
      )}
    </div>
  );
};
