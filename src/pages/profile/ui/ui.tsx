import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FormCard, type FormData } from "@/entities/form";
import style from "./style.module.scss";

export const Content = () => {
  const [form, setForm] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();

  const redirect = async () => {
    try {
      const formId: string = crypto.randomUUID();
      navigate(`/form/${formId}`);

      await setDoc(doc(db, "forms", formId), {
        id: formId,
        name: "Новая форма",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Неизвестная ошибка", error);
      }
    }
  };

  useEffect(() => {
    const getAllForms = async () => {
      try {
        setIsLoading(true);
        const forms = await query(collection(db, "forms"));
        const getForms = onSnapshot(forms, (q) => {
          const res: FormData[] = [];
          q.forEach((item) => res.push({ id: item.id, ...item.data() }));
          setForm(res);
          setIsLoading(false);
        });

        return () => getForms();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };

    getAllForms();
  }, []);

  const loadForms = () => {
    if (isLoading) {
      return <h1>Загрузка...</h1>;
    } else if (form.length === 0) {
      return <h1>У вас нету форм.</h1>;
    } else {
      return form.map((item) => <FormCard key={item.id} form={item} />);
    }
  };

  return (
    <div className={style.userProfile}>
      <section className={style.createSection}>
        <h1>Создать форму</h1>
        <Button onClick={redirect}>Создать</Button>
      </section>
      <section className={style.myForms}>{loadForms()}</section>
    </div>
  );
};
