import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);
