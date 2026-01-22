import style from "./style.module.scss";

export const FormCardSkeleton = () => {
  return (
    <div className={style.formInfoSkeleton}>
      <div className={style.formNameSkeleton} />
      <div className={style.formDescSkeleton} />
      <div className={style.formCreateDateSkeleton} />
    </div>
  );
};
