import type { FormData } from "@/shared/model";
import { useState, type ChangeEvent } from "react";

export const useInput = <T>(object: T) => {
  const [value, setValue] = useState(object);
  const [formInfo, setFormInfo] = useState<FormData | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValue((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  return { value, setValue, formInfo, setFormInfo, handleChange, handleBlur };
};
