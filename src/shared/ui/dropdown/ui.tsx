import { useEffect, useRef, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./style.module.scss";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
  top?: number;
  left?: number;
  right?: number;
}

export const Dropdown = ({
  isOpen,
  onClose,
  top,
  left,
  right,
  children,
}: PropsWithChildren<DropdownProps>) => {
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
    <div
      className={clsx(style.dropDown, isOpen && style.active)}
      ref={ref}
      style={{ top: `${top}px`, left: `${left}px`, right: `${right}px` }}
      data-testid="dropdown"
    >
      <div className={style.dropDownContent}>{children}</div>
    </div>
  );
};

Dropdown.Item = ({
  children,
  onClose,
  onClick,
}: PropsWithChildren<Omit<DropdownProps, "isOpen">>) => {
  const handleClose = (e: any) => {
    e.preventDefault();
    onClick?.();
    onClose();
  };

  return (
    <div className={style.dropDownItem} onClick={handleClose}>
      {children}
    </div>
  );
};

Dropdown.Link = ({
  path,
  onClose,
  children,
}: PropsWithChildren<{ path: string; onClose: () => void }>) => {
  return (
    <Link
      to={path}
      className={clsx(style.dropDownItem, style.dropDownItemLink)}
      onClick={onClose}
    >
      {children}
    </Link>
  );
};
