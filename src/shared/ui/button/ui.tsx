import type { ButtonHTMLAttributes } from "react";
import style from "./style.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(style.customButton, className)}
      {...props}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};
