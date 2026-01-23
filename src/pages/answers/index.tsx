import { ProtectedFormRoute } from "@/features/login";
import type { FormAnswers } from "@/shared/model";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router-dom";
import { Button, ErrorMessage } from "@/shared/ui";
import style from "./style.module.scss";

const AnswersPage = () => {
  const db = getFirestore();
  const { id = "" } = useParams();
  const [data, loading] = useDocumentData(
    doc(db, "answers", id) as DocumentReference<FormAnswers>,
  );

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <ErrorMessage>Пока что ответы отсутствуют :(</ErrorMessage>;

  return (
    <ProtectedFormRoute formID={id}>
      <div className={style.answersPage}>
        <div className={style.formName}>{data.name}</div>
        <div className={style.userList}>
          {data.answers.map((answer) => (
            <div key={answer.userID} className={style.userCard}>
              <Link
                to={`/form/${id}/answers/${answer.userID}`}
                className={style.link}
              >
                <div className={style.userAvatar}>
                  <img
                    src={answer.userPhotoUrl}
                    alt={answer.username}
                    className={style.avatar}
                  />
                </div>
                <div className={style.username}>{answer.username}</div>
                <Button className={style.linkBtn} variant="outline">
                  Перейти
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedFormRoute>
  );
};

export default AnswersPage;
