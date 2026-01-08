import { ProtectedRoute } from "@/features/login";
import { FormHeader } from "./ui/form-header";
import style from "./style.module.scss";
import { useParams } from "react-router-dom";
import { QuestionsList, saveID } from "@/features/form-builder";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib";

const EditFormPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(saveID(id));
    }
  }, []);

  return (
    <ProtectedRoute>
      <section className={style.editFormPage}>
        <FormHeader />
        <QuestionsList />
      </section>
    </ProtectedRoute>
  );
};

export default EditFormPage;
