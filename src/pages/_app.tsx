import { type AppType } from "next/app";
import { Inter_Tight } from "@next/font/google";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { MapProvider } from "react-map-gl";

const openSans = Inter_Tight({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={openSans.className}>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);
