import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./style.module.scss";

export const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    setProgress(0);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 350);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isVisible && (
        <div className={style.progressBar}>
          <div
            className={style.progressLine}
            style={{ width: `${progress}%`, transition: "width 0.4s ease" }}
          ></div>
        </div>
      )}
    </>
  );
};
