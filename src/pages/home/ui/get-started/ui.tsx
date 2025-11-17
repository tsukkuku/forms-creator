import { Button } from "@/shared/ui";
import style from "./style.module.scss";
import { useLogin } from "@/features/login";
import { ClipLoader } from "react-spinners";

export const GetStarted = () => {
  const { user, isLoading, handleLogin } = useLogin();

  return (
    <section className={style.getStarted}>
      <h3 className={style.sectionTitle}>
        Создайте свою первую форму бесплатно!
      </h3>
      <div className={style.loginButtons}>
        <Button
          className={style.firstButton}
          onClick={handleLogin}
          disabled={isLoading || !!user}
          startContent={isLoading && <ClipLoader size={17} color="#a0a0a0" />}
        >
          Войти
        </Button>
        <Button variant="outline" className={style.secondButton}>
          Создать форму
        </Button>
      </div>
    </section>
  );
};
