import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(style.customButton, style[variant], className)}
      {...props}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};
