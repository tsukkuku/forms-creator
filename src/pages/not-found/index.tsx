import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.notFoundPage}>
      <title>404</title>
      <div className={style.text}>404</div>
      <div className={style.title}>Страница не найдена</div>
      <div className={style.paragraph}>
        Страницы, которую вы ищете, не существует
      </div>
      <Button variant="outline" onClick={() => navigate("/")}>
        На главную
      </Button>
    </div>
  );
};

export default NotFoundPage;
