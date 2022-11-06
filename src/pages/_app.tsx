import { type AppType } from "next/app";
import { Inter } from "@next/font/google";
import { MapProvider } from "react-map-gl";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);
