import { Button } from "@/shared/ui";
import style from "./style.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <span>Forms</span>
        <span>Creator</span>
      </div>
      <div className={style.loginBtn}>
        <Button>Войти</Button>
      </div>
    </header>
  );
};
