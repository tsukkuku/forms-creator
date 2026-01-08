import { useState } from "react";
import { useQuestion } from "../../../lib";
import { Dropdown } from "@/shared/ui";
import style from "./style.module.scss";

interface QuestionChangeTypeProps {
  questionID: string;
}

export const QuestionChangeType = ({ questionID }: QuestionChangeTypeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { updateQuestionType } = useQuestion();

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const changeQuestionType = (type: string) => {
    updateQuestionType(questionID, type);
  };

  return (
    <div className={style.changeQuestionType}>
      <div className={style.dropDownBtn} onClick={handleClose}>
        Тип вопроса
      </div>
      <Dropdown isOpen={isOpen} onClose={handleClose}>
        <Dropdown.Item
          onClose={handleClose}
          onClick={() => changeQuestionType("one")}
        >
          Один ответ
        </Dropdown.Item>
        <Dropdown.Item
          onClose={handleClose}
          onClick={() => changeQuestionType("many")}
        >
          Несколько ответов
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};
