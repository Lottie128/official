import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout";
import Home from "./home";
import About from "./about";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
]);
