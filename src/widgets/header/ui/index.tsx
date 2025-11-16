import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, handleLogin, singOut } = useLogin();

  return (
    <header className={style.header}>
      <Link className={style.logo} to={user ? "/me" : "/"}>
        <span>Forms</span>
        <span>Creator</span>
      </Link>
      <div className={style.loginBtn}>
        {user ? (
          <div onClick={singOut}>{user.displayName}</div>
        ) : (
          <Button onClick={handleLogin}>Войти</Button>
        )}
      </div>
    </header>
  );
};
