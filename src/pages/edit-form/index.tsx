import { useParams } from "react-router-dom";
import { FormHeader, QuestionsList, saveID } from "@/features/form-builder";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib";
import style from "./style.module.scss";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import type { FormData } from "@/shared/model";
import { FormPageSkeleton } from "@/widgets/form-skeletons";
import { ProtectedFormRoute } from "@/features/login";

const EditFormPage = () => {
  const db = getFirestore();
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();

  const [data, loading] = useDocumentData(
    doc(db, "forms", id) as DocumentReference<FormData>,
  );

  useEffect(() => {
    if (id) {
      dispatch(saveID(id));
    }
  }, []);

  if (loading) return <FormPageSkeleton />;
  if (!data) return <h1>Такой формы не существует</h1>;

  return (
    <ProtectedFormRoute formID={id!}>
      <section className={style.editFormPage}>
        <FormHeader data={data} />
        <QuestionsList data={data} />
      </section>
    </ProtectedFormRoute>
  );
};

export default EditFormPage;
