import { Link } from "react-router-dom";
import type { FormData } from "../../model/types";
import { formatDate } from "../../lib";
import stub from "./img/Image-not-found.png";
import style from "./style.module.scss";

interface FormCardProps {
  form: FormData;
}

export const FormCard = ({ form }: FormCardProps) => {
  return (
    <Link to={`/form/${form.id}`} className={style.link}>
      <div className={style.formLogo}>
        <img src={stub} alt="Заглушка" className={style.logo} />
      </div>
      <div className={style.formInfo}>
        <div className={style.formName}>{form.name}</div>
        <div className={style.formCreateDate}>{formatDate(form.createdAt)}</div>
      </div>
    </Link>
  );
};
