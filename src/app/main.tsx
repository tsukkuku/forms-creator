import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouteProvider } from "./provider";
import { StoreProvider } from "./provider/store-provider";
import "./styles/global.scss";
import "./styles/reset.scss";
import { ThemeProvider } from "./provider/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
