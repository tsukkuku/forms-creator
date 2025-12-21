import type { Timestamp } from "firebase/firestore";

type VariantFormat = "create" | "update";

export const formatDate = (variant: VariantFormat, date?: Timestamp) => {
  if (variant === "create") {
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
  } else {
    if (!date) {
      return "Дата не указана";
    }

    const newDate = date.toDate();
    const userLocation = navigator.language;

    return newDate.toLocaleDateString(userLocation, {
      day: "numeric",
      year: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    });
  }
};
