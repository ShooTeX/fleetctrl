import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProperties
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: IconProp;
}

export const Button = ({ children, icon, ...rest }: ButtonProperties) => {
  return (
    <button
      type="button"
      className="flex items-center space-x-2 rounded-lg bg-zinc-800 px-5 py-1 font-medium uppercase text-slate-50 transition-all ease-in-out hover:shadow-lg"
      {...rest}
    >
      {!!icon && <FontAwesomeIcon icon={icon} className="h-5 text-zinc-400" />}
      <div>{children}</div>
    </button>
  );
};
