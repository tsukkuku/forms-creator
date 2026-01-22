import { useForms } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/shared/model";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@/shared/ui";
import toast from "react-hot-toast";
import clsx from "clsx";
import style from "./style.module.scss";
import { FormColorPicker } from "./form-color-picker";

interface FormDataTest {
  name: string;
  description: string;
}

interface FomrHeader {
  data: FormData;
}

export const FormHeader = ({ data }: FomrHeader) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataTest>({ mode: "onBlur" });

  const { updateForm } = useForms();
  const navigate = useNavigate();

  const handleSave = async (value: FormDataTest) => {
    if (data.id) {
      await updateForm(data.id, value);
      toast.success("Данные формы успешно обновлены!");
      navigate("/me");
    }
  };

  return (
    <div
      className={style.formHeader}
      style={{ borderTop: `15px solid ${data.color}` }}
    >
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
      </div>
      <div className={style.buttonsGroup}>
        <Button
          onClick={handleSubmit((value) => handleSave(value))}
          disabled={!isValid}
        >
          Сохранить
        </Button>
        <FormColorPicker formID={data.id} initialColor={data?.color} />
      </div>
    </div>
  );
};
