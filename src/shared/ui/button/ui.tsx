import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export const Button = ({
  variant = "primary",
  className,
  children,
  startContent,
  endContent,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(style.customButton, style[variant], className)}
      {...props}
      data-testid="custom-button"
    >
      {startContent && startContent}
      {children}
      {endContent && endContent}
    </button>
  );
};
