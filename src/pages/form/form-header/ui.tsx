import type { FormData } from "@/shared/model";
import style from "./style.module.scss";
import { useLogin } from "@/features/login";
import { Button } from "@/shared/ui";
import { ClipLoader } from "react-spinners";

interface FormInfoProps {
  form: FormData;
}

export const FormHeader = ({ form }: FormInfoProps) => {
  const { user, isLoading, handleLogin } = useLogin();

  return (
    <div
      className={style.formHeader}
      style={{ borderTopColor: `${form.color}` }}
    >
      <div className={style.formName}>{form.name}</div>
      <div className={style.formDescription}>{form.description}</div>
      <div className={style.user}>
        {user ? (
          <div className={style.userCard}>
            <div className={style.userInfo}>
              <span className={style.text}>Вы авторизованы как:</span>
              <span className={style.username}>{user?.displayName}</span>
            </div>
          </div>
        ) : (
          <Button onClick={handleLogin} style={{ marginBottom: "5px" }}>
            {isLoading ? <ClipLoader /> : "Войти"}
          </Button>
        )}
      </div>
    </div>
  );
};
