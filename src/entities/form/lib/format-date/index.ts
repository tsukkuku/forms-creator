import type { Timestamp } from "firebase/firestore";

export const formatDate = (date?: Timestamp) => {
  if (!date) {
    return "Дата не указана";
  }

  const newDate = date.toDate();
  const userLocation = navigator.language;

  return newDate.toLocaleDateString(userLocation, {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
};
