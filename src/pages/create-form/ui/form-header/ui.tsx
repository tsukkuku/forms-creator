import { useForms } from "@/shared/api";
import type { FormData } from "@/shared/model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.scss";

export const FormHeader = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<FormData | null>(null);
  const { isLoading, getFormInfo } = useForms();

  useEffect(() => {
    const loadForm = async () => {
      if (id) {
        const formInfo = await getFormInfo(id);
        setInfo(formInfo);
      }
    };

    loadForm();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={style.formHeader}>
      <div className={style.formTitle}>{info?.name}</div>
    </div>
  );
};
