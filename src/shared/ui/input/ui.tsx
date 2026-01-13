import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  error?: string;
}

export const Input = ({
  startContent,
  endContent,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={style.inputContainer}>
      {startContent && startContent}
      <input
        {...props}
        className={clsx(style.input, className, error && style.error)}
      />
      {endContent && endContent}
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};
