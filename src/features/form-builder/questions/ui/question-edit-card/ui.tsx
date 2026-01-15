import type { Question } from "@/shared/model";
import { useOption, useQuestion } from "../../lib";
import { OptionCard } from "./option-card";
import { Button } from "@/shared/ui";
import { MdDeleteOutline } from "react-icons/md";
import { EditText } from "../edit-text";
import { QuestionChangeType } from "./change-type";
import style from "./style.module.scss";

interface QuestionEditCardProps {
  question: Question;
}

export const QuestionEditCard = ({ question }: QuestionEditCardProps) => {
  const { addOption } = useOption();
  const { deleteQuestion, updateQuestionName, updateQuestionDescription } =
    useQuestion();

  const correctType = question.type === "one" || question.type === "many";

  return (
    <div className={style.questionCard}>
      <div className={style.questionInfo}>
        <div>
          <div className={style.questionHeader}>
            <EditText
              id={question.id}
              initialValue={question.name}
              content={
                <div className={style.questionTitle}>{question.name}</div>
              }
              updateInfo={updateQuestionName}
              className={style.questionTitle}
            />
            <Button
              className={style.deleteBtn}
              variant="danger"
              onClick={() => deleteQuestion(question)}
            >
              <MdDeleteOutline size={15} />
            </Button>
          </div>
          <EditText
            id={question.id}
            initialValue={question.description}
            content={
              <div className={style.questionDesc}>{question.description}</div>
            }
            updateInfo={updateQuestionDescription}
            className={style.descriptionInput}
          />
        </div>
        <div className={style.questionOptions}>
          {question.options.map((option) => (
            <OptionCard option={option} type={question.type} key={option.id} />
          ))}
        </div>
        <div className={style.editQuestion}>
          {correctType && (
            <Button
              onClick={() => addOption(question.id)}
              className={style.addOptionBtn}
            >
              Добавить вариант ответа
            </Button>
          )}
          <QuestionChangeType
            questionID={question.id}
            className={!correctType ? style.changeType : ""}
          />
        </div>
      </div>
    </div>
  );
};
