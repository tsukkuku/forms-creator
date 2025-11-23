import type { User } from "firebase/auth";
import { useState } from "react";
import { Dropdown } from "../dropdown";
import { ThemeModal } from "@/features/switch-theme";
import style from "./style.module.scss";

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
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
      <Dropdown isOpen={isOpen} onClose={handleOpen} open={handleOpenModal} />
      <ThemeModal isOpen={isModal} onClose={handleOpenModal} />
    </div>
  );
};
