import { useForms } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/shared/model";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@/shared/ui";
import toast from "react-hot-toast";
import { FormColorPicker } from "./form-color-picker";
import { ModalCopyLink } from "./modal-copy-link";
import clsx from "clsx";
import style from "./style.module.scss";

interface FormDataTest {
  name: string;
  description: string;
}

interface FormHeaderProps {
  data: FormData;
}

export const FormHeader = ({ data }: FormHeaderProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataTest>({ mode: "onBlur" });

  const { updateForm } = useForms();
  const navigate = useNavigate();

  const handleSave = async (value: FormDataTest) => {
    if (data.isPublic) {
      await updateForm(data.id, value);
      toast.success("Данные формы успешно обновлены!");
      navigate("/me");
    } else {
      await updateForm(data.id, { isPublic: true, ...value });
      toast.success("Форма успешно опубликована!");
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
          defaultValue={data?.description}
          className={style.changeDescription}
          error={errors.description?.message}
          placeholder="Описание"
        />
      </div>
      <div className={style.buttonsGroup}>
        <ModalCopyLink
          formID={data.id}
          isValid={isValid}
          isPublic={data.isPublic}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
        />
        <FormColorPicker formID={data.id} initialColor={data?.color} />
      </div>
    </div>
  );
};
