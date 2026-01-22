import type { FormData } from "@/shared/model";
import { FormsControl } from "@/widgets/filter-forms";
import { FormList } from "@/widgets/form-list";
import {
  collection,
  CollectionReference,
  getFirestore,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useMemo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "./style.module.scss";
import { FormCardSkeleton } from "@/entities/form";

export const Forms = () => {
  const db = getFirestore();
  const { currentUser } = getAuth();

  const [filterCategory, setFilterCategory] = useState("all");
  const [sortCategory, setSortCategory] = useState("updateAt");

  const formsQuery = useMemo(() => {
    const baseRef = collection(db, "forms") as CollectionReference<FormData>;
    const orderConstraint = orderBy(
      sortCategory,
      sortCategory === "name" ? "asc" : "desc",
    );

    if (filterCategory === "my") {
      return query(
        baseRef,
        where("creatorID", "==", currentUser?.uid),
        orderConstraint,
      );
    }

    if (filterCategory === "all") {
      return query(
        baseRef,
        or(
          where("lookedUsers", "array-contains", currentUser?.uid),
          where("creatorID", "==", currentUser?.uid),
        ),
        orderConstraint,
      );
    }

    if (filterCategory === "other") {
      return query(
        baseRef,
        where("lookedUsers", "array-contains", currentUser?.uid),
        where("creatorID", "!=", currentUser?.uid),
        orderConstraint,
      );
    }

    return query(baseRef, orderConstraint);
  }, [currentUser, filterCategory, sortCategory]);

  const [data, loading] = useCollectionData(formsQuery);

  const loadForms = () => {
    if (loading) {
      return (
        <div className={style.loading}>
          {[0, 1, 2, 3].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        </div>
      );
    } else if (data?.length === 0) {
      return <h1>У вас нету форм.</h1>;
    } else if (data) {
      return <FormList forms={data} />;
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
