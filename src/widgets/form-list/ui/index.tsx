import { useState } from "react";
import { FormCard } from "@/entities/form";
import type { FormData } from "@/shared/model";
import { ConfirmModal } from "./confirm-modal";
import style from "./style.module.scss";

interface FormListProps {
  forms: FormData[];
}

export const FormList = ({ forms }: FormListProps) => {
  const [formID, setFormID] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (id: string) => {
    setFormID(id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormID(null);
  };

  return (
    <>
      <div className={style.formList}>
        {forms.map((form) => (
          <FormCard
            key={form.id}
            form={form}
            open={() => handleOpen(form.id)}
          />
        ))}
      </div>

      <ConfirmModal isOpen={isOpen} onClose={handleClose} formID={formID} />
    </>
  );
};
