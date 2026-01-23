import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import style from "./style.module.scss";

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <div className={style.errorMessage}>
      <h1 className={style.message}>{children}</h1>
      <Button onClick={() => navigate("/me")} className={style.homeButton}>
        В профиль
      </Button>
    </div>
  );
};
