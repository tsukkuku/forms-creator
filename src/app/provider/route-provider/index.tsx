import { router } from "@/app/routers";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

export const RouteProvider = () => {
  return (
    <Suspense
      fallback={
        <PropagateLoader
          color="var(--text-color)"
          size={20}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
