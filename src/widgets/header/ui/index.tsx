import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import { Link } from "react-router-dom";
import { UserInfo } from "./user-info";
import { ClipLoader } from "react-spinners";
import { ActionButton } from "./action-button";
import style from "./style.module.scss";

interface HeaderProps {
  isFormPage?: boolean;
}

export const Header = ({ isFormPage = false }: HeaderProps) => {
  const { user, isLoading, handleLogin } = useLogin();

  return (
    <header className={style.header}>
      <Link className={style.logo} to={user ? "/me" : "/"}>
        <span>Forms</span>
        <span>Creator</span>
      </Link>
      {user ? (
        <div className={style.actionButtons}>
          {isFormPage && <ActionButton />}
          <UserInfo user={user} />
        </div>
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
