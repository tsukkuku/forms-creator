import { useState } from "react";
import { FormCard } from "@/entities/form";
import type { FormData } from "@/shared/model";
import { ConfirmModal } from "./confirm-modal";
import { RenameModal } from "./rename-modal";
import style from "./style.module.scss";

type ModalType = "rename" | "delete" | null;

interface FormListProps {
  forms: FormData[];
}

export const FormList = ({ forms }: FormListProps) => {
  const [active, setActive] = useState<ModalType>(null);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [formID, setFormID] = useState<string | null>(null);

  const handleOpen = (type: ModalType, id: string) => {
    const form = forms.find((form) => form.id === id);
    setSelectedForm(form || null);
    setFormID(id);
    setActive(type);
  };

  const handleClose = () => {
    setActive(null);
    setFormID(null);
  };

  return (
    <>
      <div className={style.formList}>
        {forms.map((form) => (
          <FormCard
            key={form.id}
            form={form}
            onRename={() => handleOpen("rename", form.id)}
            onDelete={() => handleOpen("delete", form.id)}
          />
        ))}
      </div>

      <RenameModal
        isOpen={active === "rename"}
        onClose={handleClose}
        formID={formID}
        formName={selectedForm?.name}
      />
      <ConfirmModal
        isOpen={active === "delete"}
        onClose={handleClose}
        formID={formID}
      />
    </>
  );
};
