import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProperties = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, ...rest }: ButtonProperties) => {
  return (
    <button
      type="button"
      className="rounded-lg bg-zinc-800 px-7 py-1 text-lg font-semibold uppercase text-slate-50 transition-all hover:shadow-lg ease-in-out"
      {...rest}
    >
      {children}
    </button>
  );
};
