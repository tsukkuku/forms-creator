import type { FormAnswers } from "@/shared/model";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import { Button, ErrorMessage } from "@/shared/ui";
import { ProtectedFormRoute } from "@/features/login";

const UserAnswersPage = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const { id = "", userID = "" } = useParams();
  const [data, loading] = useDocumentData(
    doc(db, "answers", id) as DocumentReference<FormAnswers>,
  );

  const userInfo = data?.answers.find((user) => user.userID === userID);

  if (loading) return <h1>Loading...</h1>;
  if (!userInfo)
    return (
      <ErrorMessage>
        У этого пользователя не имеется ответов на данную форму
      </ErrorMessage>
    );

  return (
    <ProtectedFormRoute formID={id}>
      <div className={style.userAnswersPage}>
        <div className={style.pageHeader}>
          <div className={style.userInfo}>
            <div className={style.userAvatar}>
              <img
                src={userInfo?.userPhotoUrl}
                alt={userInfo?.username}
                className={style.avatar}
              />
            </div>
            <div className={style.username}>{userInfo?.username}</div>
          </div>
          <Button onClick={() => navigate(-1)}>Назад</Button>
        </div>
        <div className={style.answerList}>
          {userInfo?.userAnswers.answers.map((answer, index) => (
            <div key={answer.questionID} className={style.answerCard}>
              <div className={style.questionInfo}>
                <div className={style.questionName}>
                  {index + 1}. {answer.questionName}
                </div>
                <div className={style.questionDescription}>
                  {answer.questionDescription}
                </div>
              </div>
              {answer.value ? typeof answer.value === "string" ? (
                <div className={style.answer}>{answer.value}</div>
              ) : (
                answer.value.map((item, index) => (
                  <div key={index} className={style.answer}>
                    {index + 1}. {item}
                  </div>
                ))
              ) : <div>Нет ответа</div>}
            </div>
          ))}
        </div>
      </div>
    </ProtectedFormRoute>
  );
};

export default UserAnswersPage;
