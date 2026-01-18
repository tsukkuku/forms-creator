import { getAuth } from "firebase/auth";

export const creatorCheck = (creatorID: string) => {
  const { currentUser } = getAuth();

  if (currentUser?.uid !== creatorID) {
    return false;
  }

  return true;
};
