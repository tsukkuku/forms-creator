import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib";
import type { FormData } from "@/shared/model";
import stub from "./img/Image-not-found.png";
import { MdAccessTimeFilled } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown } from "@/shared/ui";
import style from "./style.module.scss";

interface FormCardProps {
  form: FormData;
  onRename: () => void;
  onDelete: () => void;
}

export const FormCard = ({ form, onRename, onDelete }: FormCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const openDropDown = (e: MouseEvent) => {
    e.preventDefault();
    handleOpen();
  };

  return (
    <Link to={`/form/${form.id}`} className={style.link}>
      <div className={style.formLogo}>
        <img src={stub} alt="Заглушка" className={style.logo} />
      </div>
      <div className={style.formInfo}>
        <div className={style.formName}>{form.name}</div>
        <div className={style.formCreateDate}>
          <div className={style.createDate}>
            <MdAccessTimeFilled /> {formatDate(form.createdAt)}
          </div>
          <div className={style.settingsIcon} onClick={openDropDown}>
            <PiDotsThreeOutlineVerticalFill size={18} />
          </div>
          <Dropdown isOpen={isOpen} onClose={handleOpen} top={35} right={10}>
            <Dropdown.Item onClose={handleOpen} onClick={onRename}>
              Переименовать
            </Dropdown.Item>
            <Dropdown.Item onClose={handleOpen} onClick={onDelete}>
              Удалить
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </Link>
  );
};
