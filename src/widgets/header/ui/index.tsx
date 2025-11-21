import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { UserInfo } from "./user-info";

export const Header = () => {
  const { user, isLoading, handleLogin } = useLogin();

  return (
    <header className={style.header}>
      <Link className={style.logo} to={user ? "/me" : "/"}>
        <span>Forms</span>
        <span>Creator</span>
      </Link>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <Button
          onClick={handleLogin}
          disabled={isLoading || !!user}
          startContent={
            isLoading && (
              <ClipLoader size={13} color="var(--button-disabled-text)" />
            )
          }
        >
          Войти
        </Button>
      )}
    </header>
  );
};
