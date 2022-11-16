import { Toaster as RhtToaster } from "react-hot-toast";

export const Toaster = () => (
  <RhtToaster
    containerStyle={{
      position: "relative",
      inset: 0,
      width: "100%",
      height: "100%",
    }}
    toastOptions={{
      style: {
        backgroundColor: "#27272a",
        color: "white",
      },
      iconTheme: {
        primary: "white",
        secondary: "#3f3f46",
      },
    }}
  />
);
