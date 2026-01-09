import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomeLayout = lazy(() => import("@/app/layouts/home-layout"));
const Home = lazy(() => import("@/pages/home"));
const Profile = lazy(() => import("@/pages/profile"));
const EditFormPage = lazy(() => import("@/pages/edit-form"));
const FormPage = lazy(() => import("@/pages/form"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "/me", Component: Profile },
      { path: "/form/:id/edit", Component: EditFormPage },
      { path: "/form/:id", Component: FormPage },
    ],
  },
]);
