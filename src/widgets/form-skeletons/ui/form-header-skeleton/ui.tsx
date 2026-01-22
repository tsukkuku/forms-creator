import style from "./style.module.scss";

export const FormHeaderSkeleton = () => {
  return (
    <div className={style.formHeaderSkeleton}>
      <div className={style.formNameSkeleton} />
      <div className={style.formDescriptionSkeleton} />
      <div className={style.userSkeleton} />
    </div>
  );
};
