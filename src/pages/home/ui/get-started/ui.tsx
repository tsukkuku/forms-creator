import { Button } from "@/shared/ui";
import style from "./style.module.scss";

export const GetStarted = () => {
  return (
    <section className={style.getStarted}>
      <h3 className={style.sectionTitle}>
        Создайте свою первую форму бесплатно!
      </h3>
      <div className={style.loginButtons}>
        <Button className={style.firstButton}>Войти</Button>
        <Button variant="outline" className={style.secondButton}>
          Создать форму
        </Button>
      </div>
    </section>
  );
};
