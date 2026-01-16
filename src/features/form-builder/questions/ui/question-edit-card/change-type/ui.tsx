import { useState } from "react";
import { useQuestion } from "../../../lib";
import { Dropdown } from "@/shared/ui";
import clsx from "clsx";
import style from "./style.module.scss";

interface QuestionChangeTypeProps {
  questionID: string;
  className?: string;
}

export const QuestionChangeType = ({
  questionID,
  className,
}: QuestionChangeTypeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { updateQuestionTypeAndReset } = useQuestion();

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const changeQuestionType = (type: string) => {
    updateQuestionTypeAndReset(questionID, type);
  };

  return (
    <div className={clsx(style.changeQuestionType, className)}>
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
        <Dropdown.Item
          onClose={handleClose}
          onClick={() => changeQuestionType("short")}
        >
          Краткий ответ
        </Dropdown.Item>
        <Dropdown.Item
          onClose={handleClose}
          onClick={() => changeQuestionType("long")}
        >
          Развернутый ответ
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};
