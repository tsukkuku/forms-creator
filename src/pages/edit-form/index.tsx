import { ProtectedRoute } from "@/features/login";
import { FormHeader } from "./ui/form-header";
import style from "./style.module.scss";

const EditFormPage = () => {
  return (
    <ProtectedRoute>
      <section className={style.editFormPage}>
        <FormHeader />
      </section>
    </ProtectedRoute>
  );
};

export default EditFormPage;
