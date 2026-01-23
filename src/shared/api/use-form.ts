import { getAuth, type User } from "firebase/auth";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AnswerData } from "../model";

export const useForms = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const createForm = async () => {
    try {
      const formId: string = crypto.randomUUID();
      const user = auth.currentUser;

      if (!user) {
        toast.error("Вы не авторизованы");
        throw new Error("Пользователь не авторизован");
      }

      navigate(`/form/${formId}/edit`);

      await setDoc(doc(db, "forms", formId), {
        id: formId,
        name: "Новая форма",
        description: "Описание",
        creator: user.displayName,
        creatorID: user.uid,
        color: "#4169E1",
        lookedUsers: [],
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp(),
        questions: [
          {
            id: crypto.randomUUID(),
            name: "Вопрос без заголовка",
            description: "Описание",
            type: "one",
            options: [{ id: crypto.randomUUID(), name: "Вариант 1" }],
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Неизвестная ошибка", error);
      }
    }
  };

  const deleteForm = async (id: string) => {
    try {
      await deleteDoc(doc(db, "forms", id));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const updateFormTitle = async (formID: string, newName: string) => {
    try {
      const formTitle = doc(db, "forms", formID);
      const formRef = doc(db, "answers", formID);
      await updateDoc(formTitle, {
        name: newName,
        updateAt: serverTimestamp(),
      });
      await updateDoc(formRef, {
        name: `Ответы пользователей формы ${newName}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Неизвестная ошибка", error);
      }
    }
  };

  const updateForm = async (formID: string, changedValues: any) => {
    try {
      const form = doc(db, "forms", formID);
      await updateDoc(form, {
        ...changedValues,
        updateAt: serverTimestamp(),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Неизвестная ошибка", error);
      }
    }
  };

  const updateFormColor = async (formID: string, newColor: string) => {
    const formRef = doc(db, "forms", formID);

    await updateDoc(formRef, {
      color: newColor,
      updateAt: serverTimestamp(),
    });
  };

  const sendAnswers = async (
    formName: string,
    formID: string,
    user: User,
    answers: AnswerData,
  ) => {
    const answerRef = doc(db, "answers", formID);

    const docSnap = await getDoc(answerRef);

    if (docSnap.exists()) {
      await updateDoc(answerRef, {
        answers: arrayUnion({
          userID: user.uid,
          username: user.displayName,
          userPhotoUrl: user.photoURL,
          userAnswers: answers,
        }),
      });
    } else {
      await setDoc(answerRef, {
        id: formID,
        name: `Ответы пользователей формы ${formName}`,
        createdAt: serverTimestamp(),
        answers: [
          {
            userID: user.uid,
            username: user.displayName,
            userPhotoUrl: user.photoURL,
            userAnswers: answers,
          },
        ],
      });
    }
  };

  const recordUser = async (formID: string) => {
    const formRef = doc(db, "forms", formID);

    if (auth.currentUser) {
      await updateDoc(formRef, {
        lookedUsers: arrayUnion(auth.currentUser?.uid),
      });
    }
  };

  return {
    db,
    createForm,
    deleteForm,
    updateFormTitle,
    updateForm,
    updateFormColor,
    sendAnswers,
    recordUser,
  };
};
