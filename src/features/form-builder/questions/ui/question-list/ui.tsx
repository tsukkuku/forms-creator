import { useEffect } from "react";
import { useQuestion } from "../../lib";
import { QuestionEditCard } from "../question-edit-card";
import { AddQuestion } from "../add-questions";
import style from "./style.module.scss";

export const QuestionsList = () => {
  const { questions, loading, loadQuestions } = useQuestion();

  useEffect(() => {
    loadQuestions();
  }, []);

  if (loading) {
    return <h1>Загрузка формы...</h1>;
  }

  return (
    <div className={style.questionList}>
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionEditCard question={question} key={question.id} />
        ))
      ) : (
        <div>Добавьте свой вопрос</div>
      )}
      <AddQuestion />
    </div>
  );
};
