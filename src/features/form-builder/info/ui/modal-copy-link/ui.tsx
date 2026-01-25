import { Button, Input, Modal } from "@/shared/ui";
import { useState } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import toast from "react-hot-toast";
import style from "./style.module.scss";

interface ModalCopyLinkProps {
  formID: string;
  isPublic: boolean;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<any>;
  handleSave: (value: any) => void;
}

export const ModalCopyLink = ({
  formID,
  isPublic,
  isValid,
  handleSave,
  handleSubmit,
}: ModalCopyLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const copyFormUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/form/${formID}`);
    toast.success("Скопировано!");
    handleOpen();
    handleSubmit((value) => handleSave(value))();
  };

  return (
    <>
      <Button onClick={handleOpen} disabled={!isValid}>
        {isPublic ? "Сохранить" : "Опубликовать"}
      </Button>
      <Modal isOpen={isOpen} onClose={handleOpen} className={style.copyModal}>
        <Modal.Header onClose={handleOpen}>Поделиться формой</Modal.Header>
        <Modal.Body>
          <div className={style.urlInput}>
            <Input
              value={`${window.location.origin}/form/${formID}`}
              readOnly
            />
          </div>
          <div className={style.buttonsGroup}>
            <Button variant="outline" onClick={handleOpen}>
              Отмена
            </Button>
            <Button onClick={copyFormUrl}>
              {isPublic
                ? "Копировать и сохранить"
                : "Копировать и опубликовать"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
