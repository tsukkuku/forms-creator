import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomeLayout = lazy(() => import("@/app/layouts/home-layout"));
const Home = lazy(() => import("@/pages/home"));
const Profile = lazy(() => import("@/pages/profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "/me", Component: Profile },
    ],
  },
]);
