import { Input } from "@/shared/ui";
import { useState, type ReactNode } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { GrEdit } from "react-icons/gr";

interface FormData {
  text: string;
}

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = (value: FormData) => {
    updateInfo(id, value.text.trim());
    setIsEdit(false);
  };

  return (
    <div onClick={() => setIsEdit((prev) => !prev)} className={style.editText}>
      {isEdit ? (
        <form
          onSubmit={handleSubmit((value) => onSubmit(value))}
          className={clsx(style.editForm, className)}
        >
          <Input
            {...register("text", { required: "Поле не должно быть пустым" })}
            defaultValue={initialValue}
            onClick={(e) => e.stopPropagation()}
            error={errors.text?.message}
            autoFocus
          />
        </form>
      ) : (
        <div className={style.editTextContent}>
          {content}
          <GrEdit className={style.editIcon} size={12} />
        </div>
      )}
    </div>
  );
};
