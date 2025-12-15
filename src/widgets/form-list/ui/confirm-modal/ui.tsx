import { Button, Modal } from "@/shared/ui";
import { useForms } from "@/shared/api";
import toast from "react-hot-toast";
import style from "./style.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  formID: string | null;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  formID,
}: ConfirmModalProps) => {
  const { deleteForm } = useForms();

  const handleDelete = () => {
    if (formID) {
      deleteForm(formID);
      toast.success("Форма успешно удалена!");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={style.confirmModal}>
      <Modal.Header onClose={onClose} className={style.confirmHeader}>
        <div className={style.title}>Удалить форму?</div>
      </Modal.Header>
      <Modal.Body>
        <p className={style.text}>
          Вы уверены, что хотите удалить эту форму? После удаления восстановить
          форму будет невозможно.
        </p>
        <div className={style.buttonsGroup}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
