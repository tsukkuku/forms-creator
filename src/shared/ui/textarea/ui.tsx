import { type TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = ({ error, className, ...props }: TextareaProps) => {
  return (
    <div className={style.textareaContainer}>
      <textarea
        {...props}
        className={clsx(style.textarea, className, error && style.error)}
      />
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};
