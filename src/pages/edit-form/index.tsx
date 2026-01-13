import { ProtectedEditRoute } from "./ui/protected-edit-route";
import { useParams } from "react-router-dom";
import { FormHeader, QuestionsList, saveID } from "@/features/form-builder";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib";
import style from "./style.module.scss";

const EditFormPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(saveID(id));
    }
  }, []);

  return (
    <ProtectedEditRoute formID={id!}>
      <section className={style.editFormPage}>
        <FormHeader />
        <QuestionsList />
      </section>
    </ProtectedEditRoute>
  );
};

export default EditFormPage;
