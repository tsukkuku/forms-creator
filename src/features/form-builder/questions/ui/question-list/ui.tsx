import { QuestionEditCard } from "../question-edit-card";
import { AddQuestion } from "../add-questions";
import type { FormData } from "@/shared/model";
import style from "./style.module.scss";

interface QuestionsListProps {
  data: FormData;
}

export const QuestionsList = ({ data }: QuestionsListProps) => {
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
