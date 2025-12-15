import type { PropsWithChildren, ReactNode } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  return createPortal(
    <div
      className={clsx(style.modal, isOpen && style.active)}
      onClick={onClose}
      data-testid="modal"
    >
      {isOpen && (
        <div
          className={clsx(style.modalContent, className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>,
    document.body
  );
};

interface ModalHeaderProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

Modal.Header = ({ children, className, onClose }: ModalHeaderProps) => {
  return (
    <div className={clsx(style.modalHeader, className)}>
      <div className={style.modalTitle}>{children}</div>
      <div
        onClick={onClose}
        className={style.closeIcon}
        data-testid="closeIcon"
      >
        <MdClose size={25} />
      </div>
    </div>
  );
};

Modal.Body = ({ children }: PropsWithChildren) => {
  return <div className={style.modalBody}>{children}</div>;
};
