import { Header } from "@/widgets/header";
import { ProgressBar } from "@/widgets/progress-bar";
import { Outlet } from "react-router-dom";
import style from "./style.module.scss";

const HomeLayout = () => {
  return (
    <>
      <ProgressBar />
      <Header />
      <main className={style.mainContent}>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
