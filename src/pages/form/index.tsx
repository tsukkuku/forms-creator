import { useParams } from "react-router-dom";
import { FormHeader } from "./form-header";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import type { FormData } from "@/shared/model";
import { FormQuestionList } from "@/widgets/form-questions";
import { useForms } from "@/shared/api";
import { useEffect } from "react";
import { FormPageSkeleton } from "@/widgets/form-skeletons";
import { ErrorMessage } from "@/shared/ui";
import style from "./style.module.scss";

const FormPage = () => {
  const { id = "" } = useParams();
  const db = getFirestore();

  const [data, loading, error] = useDocumentData(
    doc(db, "forms", id) as DocumentReference<FormData>,
  );

  const { recordUser } = useForms();

  useEffect(() => {
    recordUser(id);
  }, []);

  if (loading) return <FormPageSkeleton />;
  if (error)
    return (
      <ErrorMessage>Ошибка при загрузке формы {error.message}</ErrorMessage>
    );
  if (data && !data?.isPublic)
    return <ErrorMessage>Форма еще не опубликована</ErrorMessage>;
  if (!data) return <ErrorMessage>Такой формы не существует</ErrorMessage>;

  return (
    <section className={style.formPage}>
      <title>{data.name}</title>
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
