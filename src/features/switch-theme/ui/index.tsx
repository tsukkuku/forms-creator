import { Modal } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { setTheme } from "../model";
import { FaCircleCheck } from "react-icons/fa6";
import light from "./img/light.svg";
import dark from "./img/dark.svg";
import style from "./style.module.scss";

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal = ({ isOpen, onClose }: ThemeModalProps) => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>Выберите тему</Modal.Header>
      <Modal.Body>
        <div className={style.themeModal}>
          <div className={style.themeCard}>
            <img
              src={light}
              alt="Light theme"
              className={style.img}
              onClick={() => dispatch(setTheme("light"))}
            />
            <div className={style.themeName}>
              <div className={style.name}>Светлая</div>
              {theme === "light" && (
                <div className={style.checkIcon}>
                  <FaCircleCheck size={24} />
                </div>
              )}
            </div>
          </div>
          <div className={style.themeCard}>
            <img
              src={dark}
              alt="Dark theme"
              className={style.img}
              onClick={() => dispatch(setTheme("dark"))}
            />
            <div className={style.themeName}>
              <div className={style.name}>Темная</div>
              {theme === "dark" && (
                <div className={style.checkIcon}>
                  <FaCircleCheck size={24} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
