import type { Question } from "@/shared/model";
import { FormOptions } from "../form-options";
import style from "./style.module.scss";

interface FormQuestionsProps {
  question: Question;
  index: number;
}

export const FormQuestionCard = ({ index, question }: FormQuestionsProps) => {
  return (
    <div className={style.formQuestionCard}>
      <div className={style.questionInfo}>
        <div>
          <div className={style.questionTitle}>{question.name}</div>
          <div className={style.questionDescription}>
            {question.description}
          </div>
        </div>
        <div className={style.questionOptions}>
          {question.options.map((option) => (
            <FormOptions
              index={index}
              type={question.type}
              option={option}
              key={option.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
