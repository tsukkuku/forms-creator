import { useAppSelector } from "@/shared/lib";
import type { FormData } from "@/shared/model";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const useOption = () => {
  const { id } = useAppSelector((state) => state.formID);
  const db = getFirestore();

  const addOption = async (questionID: string) => {
    const form = doc(db, "forms", id);
    const formData = await getDoc(form);
    const data = formData.data() as FormData;

    const newOption = {
      id: crypto.randomUUID(),
      name: `Вариант ответа`,
    };

    const updatedQuestions = data.questions.map((item) => {
      if (item.id === questionID) {
        return {
          ...item,
          options: [...item.options, newOption],
        };
      }

      return item;
    });

    await updateDoc(form, {
      questions: updatedQuestions,
      updateAt: serverTimestamp(),
    });
  };

  const deleteOption = async (optionID: string) => {
    const form = doc(db, "forms", id);
    const formData = await getDoc(form);
    const data = formData.data() as FormData;

    const updatedQuestions = data.questions.map((item) => {
      const selectedOption = item.options.filter(
        (option) => option.id !== optionID
      );

      return {
        ...item,
        options: selectedOption,
      };
    });

    await updateDoc(form, {
      questions: updatedQuestions,
      updateAt: serverTimestamp(),
    });
  };

  const updateOptionName = async (optionID: string, value: string) => {
    const form = doc(db, "forms", id);
    const formData = await getDoc(form);
    const data = formData.data() as FormData;

    const updatedQuestions = data.questions.map((question) => {
      const updatedOptions = question.options.map((option) => {
        if (option.id === optionID) {
          return {
            ...option,
            name: value,
          };
        }
        return option;
      });

      return {
        ...question,
        options: updatedOptions,
      };
    });

    await updateDoc(form, {
      questions: updatedQuestions,
      updateAt: serverTimestamp(),
    });
  };

  return { addOption, deleteOption, updateOptionName };
};
