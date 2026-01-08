import { Input } from "@/shared/ui";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import style from "./style.module.scss";
import clsx from "clsx";

interface EditInputProps {
  className?: string;
  id: string;
  initialValue: string;
  content: ReactNode;
  updateInfo: (id: string, info: string) => void;
}

export const EditText = ({
  id,
  initialValue,
  content,
  updateInfo,
  className,
}: EditInputProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setError("Поле ввода не может быть пустым");
      return;
    }

    updateInfo(id, value);
    setIsEdit(false);
  };

  useEffect(() => {
    if (value.trim()) {
      setError("");
    }
  }, [value]);

  return (
    <div onClick={() => setIsEdit((prev) => !prev)} className={style.editText}>
      {isEdit ? (
        <form onSubmit={onSubmit} className={clsx(style.editForm, className)}>
          <Input
            value={value}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
            error={error}
            autoFocus
          />
        </form>
      ) : (
        content
      )}
    </div>
  );
};
