import { useLogin } from "@/features/login";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dropdown = ({ isOpen, onClose }: DropdownProps) => {
  const { singOut } = useLogin();
  const ref = useRef<HTMLDivElement>(null);

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
            <div className={style.dropDownItem}>
              <Link className={style.dropDownItemLink} to={"/me"}>
                Мои формы
              </Link>
            </div>
            <div className={style.dropDownItem}>Изменить тему</div>
            <div className={style.dropDownItem} onClick={singOut}>
              Выйти
            </div>
          </div>
        </div>
      )}
    </>
  );
};
