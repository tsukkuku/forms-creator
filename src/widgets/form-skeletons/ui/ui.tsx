import { FormHeaderSkeleton } from "./form-header-skeleton";
import { QuestionListSkeleton } from "./question-list-skeleton/ui";
import style from "./style.module.scss";

export const FormPageSkeleton = () => {
  return (
    <div className={style.formPageSkeleton}>
      <FormHeaderSkeleton />
      <QuestionListSkeleton />
      <QuestionListSkeleton />
      <QuestionListSkeleton />
    </div>
  );
};
