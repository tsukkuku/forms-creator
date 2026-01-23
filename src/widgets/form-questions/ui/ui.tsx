import type { FormAnswers, Question } from "@/shared/model";
import { FormQuestionCard } from "./form-card";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/shared/ui";
import { useForms } from "@/shared/api";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";
import style from "./style.module.scss";

interface FormQuestionList {
  questions: Question[];
  formName: string;
  formID: string;
}

export const FormQuestionList = ({
  formID,
  formName,
  questions,
}: FormQuestionList) => {
  const navigate = useNavigate();
  const db = getFirestore();
  const { currentUser } = getAuth();
  const { sendAnswers } = useForms();

  const [data] = useDocumentData(
    doc(db, "answers", formID) as DocumentReference<FormAnswers>,
  );

  const userInfo = data?.answers.find(
    (user) => user.userID === currentUser?.uid,
  );

  const methods = useForm({
    defaultValues: {
      answers: questions.map((question) => ({
        questionID: question.id,
        questionName: question.name,
        questionDescription: question.description,
        value: "",
      })),
    },
  });

  const { control } = methods;
  const { fields } = useFieldArray({ control, name: "answers" });

  const onSubmit = async (data: any) => {
    if (!currentUser) {
      toast.error("Войдите в аккаунт, чтобы отправить ответ");
      throw new Error("Пользователь не авторизован");
    }

    if (userInfo) {
      toast.error("Вы уже отправляли ответ на данную форму");
      throw new Error("Пользователь уже отправлял ответ на данную форму");
    }

    await sendAnswers(formName, formID, currentUser!, data);
    navigate("/me");
    toast.success("Ответы успешно отправлены!");
  };

  return (
    <FormProvider {...methods}>
      <form
        className={style.formQuestionList}
        onSubmit={methods.handleSubmit((value) => onSubmit(value))}
      >
        {fields.map((field, index) => (
          <FormQuestionCard
            question={questions[index]}
            key={field.id}
            index={index}
          />
        ))}
        <div className={style.buttonGroups}>
          <Button type="submit" className={style.sendBtn}>
            Отправить
          </Button>
          <Button
            type="button"
            className={style.sendBtn}
            variant="outline"
            onClick={() => methods.reset()}
          >
            Очистить форму
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
