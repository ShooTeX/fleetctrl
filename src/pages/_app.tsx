import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
