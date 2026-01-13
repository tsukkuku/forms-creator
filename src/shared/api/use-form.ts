import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp(),
        questions: [
          {
            id: crypto.randomUUID(),
            name: "Вопрос без названия",
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
      console.log("Форма успешна удалена!", id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const updateFormTitle = async (formID: string, newName: string) => {
    try {
      const formTitle = doc(db, "forms", formID);
      await updateDoc(formTitle, {
        name: newName,
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

  return {
    db,
    createForm,
    deleteForm,
    updateFormTitle,
    updateForm,
  };
};
