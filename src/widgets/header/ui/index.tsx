import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const Header = () => {
  const { user, isLoading, handleLogin, singOut } = useLogin();

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
          <Button
            onClick={handleLogin}
            disabled={isLoading || !!user}
            startContent={isLoading && <ClipLoader size={13} color="#a0a0a0" />}
          >
            Войти
          </Button>
        )}
      </div>
    </header>
  );
};
