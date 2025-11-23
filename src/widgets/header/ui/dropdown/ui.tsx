import { useLogin } from "@/features/login";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./style.module.scss";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  open: () => void;
}

export const Dropdown = ({ isOpen, onClose, open }: DropdownProps) => {
  const { singOut } = useLogin();
  const ref = useRef<HTMLDivElement>(null);

  const openModal = () => {
    open();
    onClose();
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (ref && !ref.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClose);
    }

    return () => document.removeEventListener("mousedown", handleClose);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className={style.dropDown} ref={ref}>
          <div className={style.dropDownContent}>
            <Link
              className={clsx(style.dropDownItem, style.dropDownItemLink)}
              to={"/me"}
              onClick={onClose}
            >
              Мои формы
            </Link>
            <div className={style.dropDownItem} onClick={openModal}>
              Сменить тему
            </div>
            <div className={style.dropDownItem} onClick={singOut}>
              Выйти
            </div>
          </div>
        </div>
      )}
    </>
  );
};
