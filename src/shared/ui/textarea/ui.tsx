import { type TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea {...props} className={clsx(style.textarea, className)} />;
};
