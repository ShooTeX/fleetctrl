import { type AppType } from "next/app";
import { Inter_Tight, Open_Sans } from "@next/font/google";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const openSans = Inter_Tight({subsets: ["latin"]});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default trpc.withTRPC(MyApp);
