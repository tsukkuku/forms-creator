import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouteProvider } from "./provider";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteProvider />
  </StrictMode>
);
