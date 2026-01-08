import type { Option, QuestionTypes } from "@/shared/model";
import { useOption } from "@/features/form-builder/questions/lib";
import { memo } from "react";
import { Button } from "@/shared/ui";
import style from "./style.module.scss";
import { MdClose } from "react-icons/md";
import { EditText } from "../../edit-text";
import { OptionField } from "../../option-field";

interface OptionCardProps {
  type: QuestionTypes;
  option: Option;
}

export const OptionCard = memo(({ type, option }: OptionCardProps) => {
  const { deleteOption, updateOptionName } = useOption();

  return (
    <div className={style.optionCard}>
      <div className={style.optionInfo}>
        <div>
          <OptionField type={type} disabled />
        </div>
        <EditText
          id={option.id}
          initialValue={option.name}
          content={<div className={style.optionTitle}>{option.name}</div>}
          updateInfo={updateOptionName}
          className={style.optionInput}
        />
      </div>
      <Button
        type="button"
        className={style.deleteOptionBtn}
        variant="outline"
        onClick={() => deleteOption(option.id)}
      >
        <MdClose size={15} />
      </Button>
    </div>
  );
});
