# FormsCreator

### [Ссылка](https://forms-creator.netlify.app/)

## Обзор
Интерактивный конструктор форм/тестов на React: позволяет создавать опросы и тесты, настраивать вопросы и внешний вид, публиковать формы и собирать ответы пользователей в реальном времени.

## Технологический стек
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593d88?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Функционал

* 🧩 Конструктор форм  
  * Создание и редактирование форм (название, описание, цветовая схема).  
  * Добавление вопросов разных типов и вариантов ответов.  
  * Управление опциями вопросов (добавление/удаление/редактирование).  
* 📄 Страница прохождения формы
* 📊 Сбор и просмотр ответов пользователей
* 👤 Управление формами через личный кабинет 
* 🔐 Авторизация через Google
* 🌙 Переключение темы (светлая/тёмная)
* 📱 Адаптивный интерфейс

## Скриншоты

<img width="1919" height="482" alt="image" src="https://github.com/user-attachments/assets/b34e0a24-23e5-43c1-a15c-4c6054c8590a" />

***Профиль***

<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/7888cf14-6766-447a-a0ce-6af4035848f0" />

***Страница редактирования формы***

<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/fae74042-3701-4eb0-be39-a18ea2dd5a54" />

***Страница ответа на форму***

<img width="1914" height="340" alt="image" src="https://github.com/user-attachments/assets/c39a0a10-b202-430c-bb0b-8fa84109f839" />

<img width="1061" height="309" alt="image" src="https://github.com/user-attachments/assets/d59cf737-17a1-453d-97e8-18d8982410da" />

***Страница ответов пользователей***


## Установка

1. Скачать исходный код
```bash
git clone https://github.com/tsukkuku/forms-creator
cd forms-creator
```

2. Установите зависимости
```bash
npm install
```

3. Создайте .env файл и вставьте туда свой API ключ Firebase
```bash
VITE_FIREBASE_KEY=FIREBASE_KEY
```

## Запуск

1. Запуск на локальном сервере
```bash
npm run dev
```

2. Сборка
```bash
npm run build
```

**Собранные файлы будут в папке dist/**

3. Просмотр собранного проекта
```bash
npm run preview
```
