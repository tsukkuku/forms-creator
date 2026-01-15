import type { QuestionTypes } from "@/shared/model";
import { Input, Textarea } from "@/shared/ui";

interface OptionFieldProps {
  type: QuestionTypes;
  disabled?: boolean;
  name?: string;
}

export const OptionField = ({
  name,
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
    return <Textarea placeholder="Развернутый ответ" disabled={disabled} />;
  }

  return (
    <Input
      type={checkType(type)}
      disabled={disabled}
      name={name}
      placeholder={type === "short" ? "Краткий ответ" : ""}
    />
  );
};
