import { useState, type ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import style from "./style.module.scss";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion = ({ children, title }: AccordionProps) => {
  const [isView, setIsView] = useState(false);

  const handleView = () => {
    setIsView((prev) => !prev);
  };

  return (
    <div
      className={style.accordion}
      onClick={handleView}
    >
      <div className={style.buttons}>
        <button className={clsx(style.accordionButton, isView && style.active)}>
          {title}
        </button>
        <IoIosArrowDown
          color="var(--text-color)"
          className={clsx(style.icon, isView && style.view)}
        />
      </div>
      <div
        className={clsx(style.accordionContent, isView && style.showContent)}
        onClick={(e) => e.stopPropagation()}
				data-testid='accordion'
      >
        <p className={style.accordionText}>{children}</p>
      </div>
    </div>
  );
};
