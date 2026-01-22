import { useForms } from "@/shared/api";
import { Button, Dropdown } from "@/shared/ui";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import style from "./style.module.scss";
import { BsFilterLeft } from "react-icons/bs";
import { FaSortAlphaDown } from "react-icons/fa";

interface FormsControlProps {
  onChangeFilter: (category: string) => void;
  onChangeSort: (category: string) => void;
}

export const FormsControl = ({
  onChangeFilter,
  onChangeSort,
}: FormsControlProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const { createForm } = useForms();

  const handleOpenFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleOpenSorted = () => {
    setSortOpen((prev) => !prev);
  };

  return (
    <section className={style.profileHeader}>
      <Button
        onClick={createForm}
        className={style.createBtn}
        endContent={<GoPlus size={20} />}
      >
        <span>Создать новую форму</span>
      </Button>
      <div className={style.sortedButtons}>
        <Button onClick={handleOpenFilter} className={style.createBtn}>
          <BsFilterLeft size={18} /> Фильтрация
        </Button>
        <Dropdown
          isOpen={filterOpen}
          onClose={handleOpenFilter}
          top={45}
          left={0}
        >
          <Dropdown.Item
            onClose={handleOpenFilter}
            onClick={() => onChangeFilter("all")}
          >
            Владелец кто угодно
          </Dropdown.Item>
          <Dropdown.Item
            onClose={handleOpenFilter}
            onClick={() => onChangeFilter("my")}
          >
            Владелец я
          </Dropdown.Item>
          <Dropdown.Item
            onClose={handleOpenFilter}
            onClick={() => onChangeFilter("other")}
          >
            Владелец не я
          </Dropdown.Item>
        </Dropdown>
        <Button onClick={handleOpenSorted} className={style.createBtn}>
          <FaSortAlphaDown size={18} />
          Сортировка
        </Button>
        <Dropdown
          isOpen={sortOpen}
          onClose={handleOpenSorted}
          top={45}
          right={0}
        >
          <Dropdown.Item
            onClose={handleOpenSorted}
            onClick={() => onChangeSort("name")}
          >
            По названию
          </Dropdown.Item>
          <Dropdown.Item
            onClose={handleOpenSorted}
            onClick={() => onChangeSort("updateAt")}
          >
            По дате изменения
          </Dropdown.Item>
          <Dropdown.Item
            onClose={handleOpenSorted}
            onClick={() => onChangeSort("createdAt")}
          >
            По дате создания
          </Dropdown.Item>
        </Dropdown>
      </div>
    </section>
  );
};
