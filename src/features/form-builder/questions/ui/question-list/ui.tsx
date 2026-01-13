import { QuestionEditCard } from "../question-edit-card";
import { AddQuestion } from "../add-questions";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { useAppSelector } from "@/shared/lib";
import type { FormData } from "@/shared/model";
import style from "./style.module.scss";

export const QuestionsList = () => {
  const db = getFirestore();
  const { id } = useAppSelector((state) => state.formID);
  const [data, loading, error] = useDocumentData(
    doc(db, "forms", id) as DocumentReference<FormData>
  );

  if (loading) {
    return <h1>Загрузка формы...</h1>;
  }

  if (!data) {
    return <h1>{error?.message}</h1>;
  }

  return (
    <div className={style.questionList}>
      {data?.questions.length > 0 ? (
        data.questions.map((question) => (
          <QuestionEditCard question={question} key={question.id} />
        ))
      ) : (
        <div>Добавьте свой вопрос</div>
      )}
      <AddQuestion />
    </div>
  );
};
