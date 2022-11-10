import { clsx } from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { IconType } from "react-icons";

interface ButtonProperties
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: IconType;
}

export const Button = ({ children, Icon, ...rest }: ButtonProperties) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex items-center space-x-2",
        "rounded-lg bg-zinc-800 px-5 py-1",
        "font-medium uppercase text-slate-50",
        "transition-all ease-in-out hover:shadow-lg"
      )}
      {...rest}
    >
      {!!Icon && <Icon className="text-xl text-zinc-400" />}
      <div>{children}</div>
    </button>
  );
};
