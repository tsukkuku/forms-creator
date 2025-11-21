import type { User } from "firebase/auth";
import { useState } from "react";
import { Dropdown } from "../dropdown";
import style from "./style.module.scss";

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={style.userInfo}>
      <div className={style.userAvatar} onClick={handleOpen}>
        <img
          src={user.photoURL || ""}
          alt={user?.displayName || "Display avatar"}
          className={style.avatar}
        />
      </div>
      <Dropdown isOpen={isOpen} onClose={handleOpen} />
    </div>
  );
};
