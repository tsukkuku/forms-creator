import { getAuth } from "firebase/auth";
import type { FormData } from "../model";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useForms = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

      navigate(`/form/${formId}`);

      await setDoc(doc(db, "forms", formId), {
        id: formId,
        name: "Новая форма",
        description: "Описание",
        creator: user.displayName,
        creatorID: user.uid,
        createdAt: serverTimestamp(),
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

  const getAllForms = () => {
    try {
      setIsLoading(true);
      const forms = query(
        collection(db, "forms"),
        orderBy("createdAt", "desc")
      );
      const getForms = onSnapshot(forms, (q) => {
        const res: FormData[] = [];
        q.forEach((item) => res.push({ ...(item.data() as FormData) }));
        setForms(res);
        setIsLoading(false);
      });

      return getForms;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        console.log(error.message);
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

  const getFormInfo = async (formID: string): Promise<FormData> => {
    try {
      setIsLoading(true);
      const docRef = doc(db, "forms", formID);
      const formInfo = await getDoc(docRef);

      if (formInfo.exists()) {
        return formInfo.data() as FormData;
      } else {
        throw new Error("Форма не найдена");
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
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
    forms,
    isLoading,
    createForm,
    getFormInfo,
    getAllForms,
    deleteForm,
    updateFormTitle,
    updateForm,
  };
};
