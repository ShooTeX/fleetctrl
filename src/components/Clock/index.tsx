import { Roboto_Mono } from "@next/font/google";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const mono = Roboto_Mono({ subsets: ["latin"] });

export const Clock = () => {
  const [date, setDate] = useState(new Date());
  const timeFormatted = format(date, "HH:mm");
  const dateFormatted = format(date, "eeee, eo MMMM");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className="flex flex-col items-end text-white">
      <div className="text-5xl font-bold text-zinc-300">
        <span className={mono.className}>{timeFormatted}</span>
      </div>
      <div className="uppercase text-zinc-400">{dateFormatted}</div>
    </div>
  );
};
