import { Accordion } from "@/shared/ui";
import style from "./style.module.scss";

export const Faq = () => {
  return (
    <section className={style.faqSection}>
      <div className={style.faqTitle}>
        <h2 className={style.title}>Поможем разобраться!</h2>
        <div className={style.secondTitle}>
          Ознакомьтесь с ответами на часто задаваемые вопросы.
        </div>
      </div>
      <Accordion title="Можно ли отредактировать форму после её создания?">
        Да. После создания формы Вы можете добавлять и изменять контент в ней.
      </Accordion>
      <Accordion title="Можно ли поделиться формой?">
        Ссылку на готовую форму можно скопировать в личном кабинете. Отправить
        её можно по электронной почте или через социальные сети.
      </Accordion>
      <Accordion title="Это бесплатно?">
        Да. Но сейчас для создания доступно максимум 5 форм
      </Accordion>
    </section>
  );
};
