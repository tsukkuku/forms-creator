import { Button } from "@/shared/ui";
import { useLogin } from "@/features/login";
import style from "./style.module.scss";
import { ClipLoader } from "react-spinners";
import { useForms } from "@/shared/api";

export const Info = () => {
  const { user, isLoading, handleLogin } = useLogin();
  const { createForm } = useForms();

  return (
    <section className={style.infoSection}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Собирайте данные легко и быстро</h1>
        <p className={style.secondTitle}>
          Бесплатный конструктор форм для сбора заявок, проведения опросов и
          получения обратной связи
        </p>
        <div className={style.navigationButtons}>
          <Button
            className={style.loginButton}
            variant="primary"
            onClick={handleLogin}
            disabled={isLoading || !!user}
            startContent={
              isLoading && (
                <ClipLoader size={17} color="var(--button-disabled-text)" />
              )
            }
          >
            {!!user ? "Вы уже авторизованы" : "Войти"}
          </Button>
          <Button
            variant="outline"
            className={style.createButton}
            onClick={createForm}
          >
            Создать форму
          </Button>
        </div>
      </div>
      <div className={style.infoImg}>
        <img
          src="https://lineleader.com/hubfs/2025%20%20US%20%20Enroll%20-%20Lead%20Capture%20-%20Website%20Images%20(17)%20(1).svg"
          alt="Info Img"
          className={style.img}
        />
      </div>
    </section>
  );
};
