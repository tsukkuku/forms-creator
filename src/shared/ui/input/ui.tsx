import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ error, className, ...props }: InputProps) => {
  return (
    <div className={style.inputContainer}>
      <input
        {...props}
        className={clsx(style.input, className, error && style.error)}
      />
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};
