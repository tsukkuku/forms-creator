import { Button } from "@/shared/ui";
import { useEffect } from "react";
import { useForms } from "@/shared/api";
import { FormList } from "@/widgets/form-list";
import style from "./style.module.scss";

export const Content = () => {
  const { forms, isLoading, getAllForms, createForm } = useForms();

  useEffect(() => {
    const unsubscribe = getAllForms();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const loadForms = () => {
    if (isLoading) {
      return <h1>Загрузка...</h1>;
    } else if (forms.length === 0) {
      return <h1>У вас нету форм.</h1>;
    } else {
      return <FormList forms={forms} />;
    }
  };

  return (
    <div className={style.userProfile}>
      <section className={style.createSection}>
        <h1>Создать форму</h1>
        <Button onClick={createForm}>Создать</Button>
      </section>
      <section className={style.myForms}>{loadForms()}</section>
    </div>
  );
};
