import Logo from "../../assets/logo.svg";
import { Clock } from "../Clock";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between bg-zinc-800 py-4 px-6">
      <Logo className="h-16 w-auto" />
      <Clock />
    </header>
  );
};
