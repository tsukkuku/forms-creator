import type { QuestionTypes } from "@/shared/model";
import { Input, Textarea } from "@/shared/ui";
import type { UseFormRegisterReturn } from "react-hook-form";

interface OptionFieldProps {
  type: QuestionTypes;
  disabled?: boolean;
  registerProps?: UseFormRegisterReturn;
  value?: string;
}

export const OptionField = ({
  registerProps,
  value,
  type,
  disabled = false,
}: OptionFieldProps) => {
  const checkType = (type: QuestionTypes) => {
    switch (type) {
      case "one":
        return "radio";
      case "many":
        return "checkbox";
      default:
        return "text";
    }
  };

  if (type === "long") {
    return (
      <Textarea
        placeholder="Развернутый ответ"
        disabled={disabled}
        {...registerProps}
      />
    );
  }

  return (
    <Input
      type={checkType(type)}
      disabled={disabled}
      value={value}
      placeholder={type === "short" ? "Краткий ответ" : ""}
      {...registerProps}
    />
  );
};
