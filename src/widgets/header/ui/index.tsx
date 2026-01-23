import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import { Link } from "react-router-dom";
import { UserInfo } from "./user-info";
import { ClipLoader } from "react-spinners";
import style from "./style.module.scss";

export const Header = () => {
  const { user, isLoading, handleLogin } = useLogin();

  return (
    <header className={style.header}>
      <Link className={style.logo} to="/">
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
