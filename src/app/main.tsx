import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouteProvider, StoreProvider, ThemeProvider } from "./provider";
import { initializeApp } from "firebase/app";
import "./styles/global.scss";
import "./styles/reset.scss";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
