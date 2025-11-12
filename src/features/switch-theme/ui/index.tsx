import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { setTheme } from "../model";

export const SwitchButton = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const changeTheme = () => {
    dispatch(setTheme());
  };

  return (
    <button onClick={changeTheme}>
      {theme === "light" ? "Темная тема" : "Светлая тема"}
    </button>
  );
};
