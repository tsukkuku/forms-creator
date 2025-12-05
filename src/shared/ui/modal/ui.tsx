import type { ReactNode } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return createPortal(
    <div
      className={clsx(style.modal, isOpen && style.active)}
      onClick={onClose}
      data-testid="modal"
    >
      {isOpen && (
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modalHeader}>
            <div className={style.modalTitle}>{title}</div>
            <div
              onClick={onClose}
              className={style.closeIcon}
              data-testid="closeIcon"
            >
              <MdClose size={25} />
            </div>
          </div>
          <div className={style.modalBody}>{children}</div>
        </div>
      )}
    </div>,
    document.body
  );
};
