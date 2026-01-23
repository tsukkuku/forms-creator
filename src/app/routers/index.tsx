import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomeLayout = lazy(() => import("@/app/layouts/home-layout"));
const Home = lazy(() => import("@/pages/home"));
const Profile = lazy(() => import("@/pages/profile"));
const EditFormPage = lazy(() => import("@/pages/edit-form"));
const FormPage = lazy(() => import("@/pages/form"));
const AnswerPage = lazy(() => import("@/pages/answers"));
const UserAnswersPage = lazy(() => import("@/pages/user-answers"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "/me", Component: Profile },
      { path: "/form/:id/edit", Component: EditFormPage },
      { path: "/form/:id", Component: FormPage },
      { path: "/form/:id/answers", Component: AnswerPage },
      { path: "/form/:id/answers/:userID", Component: UserAnswersPage },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
