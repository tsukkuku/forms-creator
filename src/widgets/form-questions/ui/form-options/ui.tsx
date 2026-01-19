import { OptionField } from "@/features/form-builder";
import type { Option, QuestionTypes } from "@/shared/model";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import style from "./style.module.scss";

interface FormOptionsProps {
  type: QuestionTypes;
  option: Option;
  index: number;
}

export const FormOptions = ({ index, type, option }: FormOptionsProps) => {
  const { register } = useFormContext();
  const correctType = type === "one" || type === "many";

  return (
    <div className={style.optionCard}>
      <div
        className={clsx(correctType ? style.optionInfo : style.optionInfoText)}
      >
        <div>
          {correctType ? (
            <OptionField
              type={type}
              value={option.name}
              registerProps={register(`answers.${index}.value`)}
            />
          ) : (
            <OptionField
              type={type}
              registerProps={register(`answers.${index}.value`)}
            />
          )}
        </div>
        {correctType && <div className={style.optionName}>{option.name}</div>}
      </div>
    </div>
  );
};
