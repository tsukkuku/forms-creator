import type { User } from "firebase/auth";
import { useState } from "react";
import { ThemeModal } from "@/features/switch-theme";
import { Dropdown } from "@/shared/ui";
import { useLogin } from "@/features/login";
import style from "./style.module.scss";

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { singOut } = useLogin();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <div className={style.userInfo}>
      <div className={style.userAvatar} onClick={handleOpen}>
        <img
          src={user.photoURL || ""}
          alt={user.displayName || "Display avatar"}
          className={style.avatar}
        />
      </div>
      <Dropdown isOpen={isOpen} onClose={handleOpen} top={45} right={10}>
        <Dropdown.Link path="/me" onClose={handleOpen}>
          Мои формы
        </Dropdown.Link>
        <Dropdown.Item onClose={handleOpen} onClick={handleOpenModal}>
          Сменить тему
        </Dropdown.Item>
        <Dropdown.Item onClick={singOut} onClose={handleOpen}>
          Выйти
        </Dropdown.Item>
      </Dropdown>
      <ThemeModal isOpen={isModal} onClose={handleOpenModal} />
    </div>
  );
};
