import { getAuth } from "firebase/auth";

export const accessControl = (formID: string, creatorID: string) => {
  const { currentUser } = getAuth();

  if (currentUser?.uid !== creatorID) {
    return `/form/${formID}`;
  } else {
    return `/form/${formID}/edit`;
  }
};
