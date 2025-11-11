import { router } from "@/app/routers";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

export const RouteProvider = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
