import { Header } from "@/widgets/header";
import { ProgressBar } from "@/widgets/progress-bar";
import { Outlet } from "react-router-dom";
import style from "./style.module.scss";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  return (
    <>
      <ProgressBar />
      <Header />
      <main className={style.mainContent}>
        <Outlet />
      </main>
      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "",
          style: {
            background: "var(--button-color)",
            color: "var(--button-text)",
          },
        }}
      />
    </>
  );
};

export default HomeLayout;
