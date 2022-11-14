import { type NextPage } from "next";
import Head from "next/head";
import { MdOutlineAddLocation } from "react-icons/md";
import { Header } from "../components/Header";
import { MapboxMap } from "../components/map/MapboxMap";
import { MapControls } from "../components/map/MapControls";
import { NavSideBar } from "../components/NavSideBar";

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
            <div className="absolute inset-x-0 top-4 z-50 m-auto flex justify-center">
              <div className="flex divide-x-2 rounded-md bg-emerald-600 py-3 text-white drop-shadow-lg">
                <div className="flex items-center space-x-2 px-5">
                  <MdOutlineAddLocation className="text-lg text-emerald-100" />
                  <span>Set a destination</span>
                </div>
                <button type="button" className="px-3 font-bold">
                  cancel
                </button>
              </div>
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
