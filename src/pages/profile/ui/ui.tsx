import { Button } from "@/shared/ui";
import { useEffect } from "react";
import { FormCard } from "@/entities/form";
import style from "./style.module.scss";
import { useForms } from "@/shared/api";

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
      return forms.map((item) => <FormCard key={item.id} form={item} />);
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
