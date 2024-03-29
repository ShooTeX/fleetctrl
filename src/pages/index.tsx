import { type NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { MapboxMap } from "../components/map/MapboxMap";
import { MapControls } from "../components/map/MapControls";
import { NavSideBar } from "../components/NavSideBar";
import { Toaster } from "../components/Toaster";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <Head>
        <title>FLEETCTRL</title>
        <meta name="FLEETCTRL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <div className="flex h-full w-full bg-zinc-800">
          <NavSideBar />
          <div className="relative flex-1 overflow-hidden rounded-tl-xl">
            <div className="pointer-events-none absolute inset-4 z-50">
              <Toaster />
            </div>
            <div className="absolute right-4 top-4 z-50">
              <MapControls />
            </div>
            <MapboxMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
