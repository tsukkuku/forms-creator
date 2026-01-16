import { useAppSelector } from "@/shared/lib";
import type { FormData, Question } from "@/shared/model";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const useQuestion = () => {
  const db = getFirestore();
  const { id } = useAppSelector((state) => state.formID);

  const addQuestion = async () => {
    const form = doc(db, "forms", id);

    await updateDoc(form, {
      questions: arrayUnion({
        id: crypto.randomUUID(),
        name: "Вопрос без заголовка",
        description: "Описание",
        type: "one",
        options: [{ id: crypto.randomUUID(), name: "Вариант 1" }],
      }),
      updateAt: serverTimestamp(),
    });
  };

  const deleteQuestion = async (question: Question) => {
    const form = doc(db, "forms", id);

    await updateDoc(form, {
      questions: arrayRemove(question),
      updateAt: serverTimestamp(),
    });
  };

  const updateQuestionName = async (questionID: string, newName: string) => {
    const form = doc(db, "forms", id);
    const formData = await getDoc(form);
    const data = formData.data() as FormData;

    const updatedQuestion = data.questions.map((question) => {
      if (question.id === questionID) {
        return {
          ...question,
          name: newName,
        };
      }

      return question;
    });

    await updateDoc(form, {
      questions: updatedQuestion,
      updateAt: serverTimestamp(),
    });
  };

  const updateQuestionDescription = async (
    questionID: string,
    description: string
  ) => {
    const form = doc(db, "forms", id);
    const formData = await getDoc(form);
    const data = formData.data() as FormData;

    const updatedQuestion = data.questions.map((question) => {
      if (question.id === questionID) {
        return {
          ...question,
          description,
        };
      }

      return question;
    });

    await updateDoc(form, {
      questions: updatedQuestion,
      updateAt: serverTimestamp(),
    });
  };

  const updateQuestionTypeAndReset = async (
    questionID: string,
    type: string
  ) => {
    const formRef = doc(db, "forms", id);
    const formData = await getDoc(formRef);
    const data = formData.data() as FormData;

    const updatedQuestions = data.questions.map((item) => {
      if (item.id === questionID) {
        const shouldReset = type === "short" || type === "long";

        return {
          ...item,
          type,
          options: shouldReset
            ? [{ id: crypto.randomUUID(), name: "Вариант 1" }]
            : item.options,
        };
      }
      return item;
    });

    await updateDoc(formRef, {
      questions: updatedQuestions,
      updateAt: serverTimestamp(),
    });
  };

  return {
    addQuestion,
    deleteQuestion,
    updateQuestionName,
    updateQuestionDescription,
    updateQuestionTypeAndReset,
  };
};
