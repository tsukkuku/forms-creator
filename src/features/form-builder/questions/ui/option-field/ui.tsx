import type { QuestionTypes } from "@/shared/model";
import { Input } from "@/shared/ui";

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
        return "radio";
    }
  };

  return <Input type={checkType(type)} disabled={disabled} name={name} />;
};
