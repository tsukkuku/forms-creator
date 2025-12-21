import { useForms } from "@/shared/api";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Textarea } from "@/shared/ui";
import { useInput } from "../../lib";
import toast from "react-hot-toast";
import style from "./style.module.scss";

export const FormHeader = () => {
  const { id } = useParams();
  const { value, setValue, formInfo, setFormInfo, handleChange, handleBlur } =
    useInput({ name: "", description: "" });

  const { isLoading, getFormInfo, updateForm } = useForms();
  const navigate = useNavigate();

  // Сделаю потом валидацию
  const hasChanged = useMemo(() => {
    if (!formInfo) return false;

    return (
      value.name.trim() !== formInfo.name ||
      value.description.trim() !== formInfo.description
    );
  }, [value, formInfo]);

  const handleSave = async () => {
    if (id && hasChanged) {
      await updateForm(id, value);
      toast.success("Данные формы успешно обновлены!");
      navigate("/me");
    }
  };

  useEffect(() => {
    const loadForm = async () => {
      if (id) {
        const formInfo = await getFormInfo(id);
        setValue({ name: formInfo.name, description: formInfo.description });
        setFormInfo(formInfo);
      }
    };

    loadForm();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (!id) return <h1>Такой формы не существует</h1>;

  return (
    <div className={style.formHeader}>
      <div className={style.formHeaderInfo}>
        <Input
          name="name"
          value={value.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Название формы"
          className={style.changeTitleInput}
        />
        <Textarea
          name="description"
          maxLength={256}
          value={value.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={style.changeDescription}
          placeholder="Описание"
        />
        <div className={style.creatorName}>Создатель: {formInfo?.creator}</div>
      </div>
      <Button onClick={handleSave} disabled={!hasChanged}>
        Сохранить
      </Button>
    </div>
  );
};
