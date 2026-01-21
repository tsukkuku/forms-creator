import { useParams } from "react-router-dom";
import { FormHeader } from "./form-header";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import type { FormData } from "@/shared/model";
import { FormQuestionList } from "@/widgets/form-questions";
import style from "./style.module.scss";
import { useForms } from "@/shared/api";
import { useEffect } from "react";

const FormPage = () => {
  const { id = "" } = useParams();
  const db = getFirestore();

  const [data, loading, error] = useDocumentData(
    doc(db, "forms", id) as DocumentReference<FormData>,
  );

  const { recordUser } = useForms();

  useEffect(() => {
    recordUser(id)
  }, [])

  if (loading) return <h1>Loading</h1>;
  if (error) return <h2>Ошибка при загрузке формы {error.message}</h2>;
  if (!data) return <h2>Такой формы не существует</h2>;

  return (
    <section className={style.formPage}>
      <FormHeader form={data} />
      <FormQuestionList
        questions={data.questions}
        formName={data.name}
        formID={data.id}
      />
    </section>
  );
};

export default FormPage;
