import { Button } from "@/shared/ui";
import { useForms } from "@/shared/api";
import { FormList } from "@/widgets/form-list";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  CollectionReference,
  getFirestore,
  query,
} from "firebase/firestore";
import type { FormData } from "@/shared/model";
import style from "./style.module.scss";

export const Content = () => {
  const db = getFirestore();
  const [data, loading] = useCollectionData(
    query(collection(db, "forms") as CollectionReference<FormData>)
  );
  const { createForm } = useForms();

  const loadForms = () => {
    if (loading) {
      return <h1>Загрузка...</h1>;
    } else if (data?.length === 0) {
      return <h1>У вас нету форм.</h1>;
    } else if (data) {
      return <FormList forms={data} />;
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
