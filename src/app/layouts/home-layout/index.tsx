import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";
import style from "./style.module.scss";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main className={style.mainContent}>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
