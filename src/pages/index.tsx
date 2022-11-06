import { type NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { MapboxMap } from "../components/map/MapboxMap";
import { MapControls } from "../components/map/MapControls";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <div className="relative h-full w-full">
          <div className="absolute right-4 top-4 z-50">
            <MapControls />
          </div>
          <MapboxMap />
        </div>
      </div>
    </>
  );
};

export default Home;
