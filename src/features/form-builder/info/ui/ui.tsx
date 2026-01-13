import { useForms } from "@/shared/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference } from "firebase/firestore";
import type { FormData } from "@/shared/model";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@/shared/ui";
import toast from "react-hot-toast";
import clsx from "clsx";
import style from "./style.module.scss";

interface FormDataTest {
  name: string;
  description: string;
}

export const FormHeader = () => {
  const { id = "" } = useParams();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataTest>({ mode: "onBlur" });

  const { db, updateForm } = useForms();
  const [data, loading] = useDocumentData(
    doc(db, "forms", id) as DocumentReference<FormData>
  );
  const navigate = useNavigate();

  const handleSave = async (value: FormDataTest) => {
    if (id) {
      await updateForm(id, value);
      toast.success("Данные формы успешно обновлены!");
      navigate("/me");
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!id) return <h1>Такой формы не существует</h1>;

  return (
    <div className={style.formHeader}>
      <div className={style.formHeaderInfo}>
        <Input
          {...register("name", { required: "Поле не должно быть пустым" })}
          defaultValue={data?.name}
          placeholder="Название формы"
          error={errors.name?.message}
          className={clsx(style.changeTitleInput, errors.name && style.error)}
        />
        <Textarea
          {...register("description", {
            required: "Поле не должно быть пустым",
            maxLength: {
              value: 256,
              message: "Описание может быть максимум 256 символов",
            },
          })}
          maxLength={256}
          defaultValue={data?.description}
          className={style.changeDescription}
          error={errors.description?.message}
          placeholder="Описание"
        />
        <div className={style.creatorName}>Создатель: {data?.creator}</div>
      </div>
      <Button
        onClick={handleSubmit((value) => handleSave(value))}
        disabled={!isValid}
      >
        Сохранить
      </Button>
    </div>
  );
};
