import { Button, Input, Modal } from "@/shared/ui";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useForms } from "@/shared/api";
import toast from "react-hot-toast";
import style from "./style.module.scss";

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
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formID) return;

    if (!value.trim()) {
      setDisabled(true);
      setError("Название формы не может быть пустым");
      return;
    } else if (value.length >= 100) {
      setDisabled(true);
      setError("Максимальное количество символов не должно превышать 100");
      return;
    }

    updateFormTitle(formID, value.trim());
    onClose();
    toast.success("Форма переименована");
  };

  useEffect(() => {
    if (value.trim()) {
      setDisabled(false);
      setError("");
    }
  }, [value]);

  useEffect(() => {
    if (formName) setValue(formName);
    setDisabled(false);
    setError("");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={style.renameModal}>
      <Modal.Header onClose={onClose} className={style.renameHeader}>
        <div className={style.renameTitle}>Переименовать форму</div>
      </Modal.Header>
      <Modal.Body>
        <div className={style.secondTitle}>Введите новое название формы</div>
        <form onSubmit={onSubmit} className={style.renameForm}>
          <Input
            autoFocus
            value={value}
            onChange={handleChange}
            className={style.renameInput}
            placeholder="Введите название"
            error={error}
          />
        </form>
        <div className={style.buttonsGroup}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSubmit} disabled={disabled} type="submit">
            Переименовать
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
