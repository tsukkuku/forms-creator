import { useEffect } from "react";
import { Button, Input, Modal } from "@/shared/ui";
import { useForms } from "@/shared/api";
import { useForm } from "react-hook-form";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import style from "./style.module.scss";

interface FormData {
  formName: string;
}

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  formID: string | null;
  formName?: string;
}

export const RenameModal = ({
  isOpen,
  onClose,
  formID,
  formName,
}: RenameModalProps) => {
  const { updateFormTitle } = useForms();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (value: FormData) => {
    if (!formID) return;

    updateFormTitle(formID, value.formName.trim());
    onClose();
    toast.success("Форма переименована");
  };

  useEffect(() => {
    if (isOpen) {
      reset({ formName: formName || "" });
    }
  }, [isOpen, formName, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={style.renameModal}>
      <Modal.Header onClose={onClose} className={style.renameHeader}>
        <div className={style.renameTitle}>Переименовать форму</div>
      </Modal.Header>
      <Modal.Body>
        <div className={style.secondTitle}>Введите новое название формы</div>
        <form
          onSubmit={handleSubmit((value) => onSubmit(value))}
          className={style.renameForm}
        >
          <Input
            {...register("formName", {
              required: "Поле не должно быть пустым",
              maxLength: {
                value: 100,
                message:
                  "Максимальное количество символов не должно превышать 100",
              },
            })}
            defaultValue={formName}
            className={style.renameInput}
            placeholder="Введите название"
            error={errors.formName?.message}
            endContent={
              <TiDelete
                className={style.clearInputIcon}
                size={25}
                onClick={() => reset({ formName: "" })}
              />
            }
          />
        </form>
        <div className={style.buttonsGroup}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={handleSubmit((value) => onSubmit(value))}
            disabled={!isValid}
          >
            Переименовать
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
