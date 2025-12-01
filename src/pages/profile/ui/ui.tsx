import { Button } from "@/shared/ui";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

interface FormData {
  id: string;
  name?: string;
}

// ПОТОМ ПО КАЙФУ СДЕЛАЮ ВСЕ
export const Content = () => {
  const [form, setForm] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();

  const redirect = async () => {
    try {
      const formId: string = crypto.randomUUID();

      await setDoc(doc(db, "forms", formId), {
        id: formId,
        name: "Новая форма",
      });

      navigate(`/form/${formId}`);
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
        const unsubscribe = onSnapshot(forms, (q) => {
          const res: FormData[] = [];
          q.forEach((item) => res.push({ id: item.id, ...item.data() }));
          setForm(res);
        });

        return () => unsubscribe();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getAllForms();
  }, []);

  if (isLoading) return <h1>Загрузка...</h1>;

  return (
    <div className={style.userProfile}>
      <div className={style.createSection}>
        <h1>Создать форму</h1>
        <Button onClick={redirect}>Создать</Button>
      </div>
      <div className={style.forms}>
        {form.map((item) => (
          <div className={style.formCard}>
            <Link to={`/form/${item.id}`}>{item.id}</Link>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
