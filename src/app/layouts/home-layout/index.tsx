import { Header } from "@/widgets/header";
import { ProgressBar } from "@/widgets/progress-bar";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import style from "./style.module.scss";

const HomeLayout = () => {
  const location = useLocation();
  const checkPage = matchPath("/form/:id", location.pathname);

  return (
    <>
      <ProgressBar />
      {checkPage ? <Header isFormPage /> : <Header />}
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
