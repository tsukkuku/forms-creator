import type { FormData } from "@/shared/model";
import { FormsControl } from "@/widgets/filter-forms";
import { FormList } from "@/widgets/form-list";
import {
  collection,
  CollectionReference,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useMemo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "./style.module.scss";

export const Forms = () => {
  const db = getFirestore();
  const { currentUser } = getAuth();

  const [filterCategory, setFilterCategory] = useState("all");
  const [sortCategory, setSortCategory] = useState("updateAt");

  const [data, loading] = useCollectionData(
    query(
      collection(db, "forms") as CollectionReference<FormData>,
      orderBy(sortCategory, `${sortCategory === "name" ? "asc" : "desc"}`),
    ),
  );

  const filteredForms = useMemo(() => {
    if (!data) return [];

    if (filterCategory === "all") {
      return data;
    }

    if (filterCategory === "my") {
      return data.filter((form) => form.creatorID === currentUser?.uid);
    }

    if (filterCategory === "other") {
      return data.filter((form) => form.creatorID !== currentUser?.uid);
    }

    return data;
  }, [data, filterCategory, currentUser]);

  const loadForms = () => {
    if (loading) {
      return <h1>Загрузка...</h1>;
    } else if (data?.length === 0) {
      return <h1>У вас нету форм.</h1>;
    } else if (filteredForms.length === 0) {
      return <h1>Формы не найдены</h1>;
    } else {
      return <FormList forms={filteredForms} />;
    }
  };

  return (
    <div className={style.userProfile}>
      <FormsControl
        onChangeFilter={setFilterCategory}
        onChangeSort={setSortCategory}
      />
      <section className={style.myForms}>{loadForms()}</section>
    </div>
  );
};
