import { useEffect, useState } from "react";
import { Button, Modal } from "@/shared/ui";
import { IoColorPaletteOutline } from "react-icons/io5";
import { COLORS } from "@/shared/constants";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useForms } from "@/shared/api";
import style from "./style.module.scss";

interface FormColorPickerProps {
  formID: string;
  initialColor: string;
}

export const FormColorPicker = ({
  formID,
  initialColor,
}: FormColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [color, setColor] = useState<string>(initialColor);
  const { updateFormColor } = useForms();

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    setSelectColor(false);
  };

  const changeColor = (color: string) => {
    updateFormColor(formID, color);
    handleOpen();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      updateFormColor(formID, color);
    }, 500);

    return () => clearTimeout(handler);
  }, [color]);

  return (
    <div className={style.formColorPicker}>
      <Button
        onClick={handleOpen}
        className={style.openModalBtn}
        title="Сменить цвет"
      >
        <IoColorPaletteOutline size={16} />
      </Button>
      <Modal isOpen={isOpen} onClose={handleOpen}>
        <Modal.Header onClose={handleOpen}>Выбор цвета</Modal.Header>
        <Modal.Body>
          {selectColor ? (
            <div className={style.colorPicker}>
              <HexColorPicker color={color} onChange={setColor} />
              <HexColorInput
                placeholder="Введите HEX код"
                color={color}
                onChange={setColor}
                className={style.colorInput}
              />
            </div>
          ) : (
            <div className={style.colorList}>
              {COLORS.map((color) => (
                <div
                  key={color.hexColor}
                  title={color.hexColor}
                  className={style.colorCard}
                  onClick={() => changeColor(color.hexColor)}
                >
                  <div
                    className={style.selectColor}
                    style={{ backgroundColor: `${color.hexColor}` }}
                  />
                  <div className={style.colorName}>{color.name}</div>
                </div>
              ))}
            </div>
          )}
          <Button
            className={style.openPicker}
            onClick={() => setSelectColor((prev) => !prev)}
          >
            {selectColor ? "Вернуться назад" : " Выбрать свой цвет"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
