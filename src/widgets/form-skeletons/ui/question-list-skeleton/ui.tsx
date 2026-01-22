import style from "./style.module.scss";

export const QuestionListSkeleton = () => {
  return (
    <div className={style.skeletonCard}>
      <div className={style.questionInfoSkeleton}>
        <div className={style.questionTitleSkeleton}></div>
        <div className={style.questionDescSkeleton}></div>
        <div className={style.questionOptionsSkeleton}>
          <div className={style.optionSkeletonCard}>
            <div className={style.optionSkeletonInput}></div>
            <div className={style.optionSkeleton}></div>
          </div>
          <div className={style.optionSkeletonCard}>
            <div className={style.optionSkeletonInput}></div>
            <div className={style.optionSkeleton}></div>
          </div>
          <div className={style.optionSkeletonCard}>
            <div className={style.optionSkeletonInput}></div>
            <div className={style.optionSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
