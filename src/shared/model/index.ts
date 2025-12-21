import type { Timestamp } from "firebase/firestore";

export interface FormData {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updateAt: Timestamp;
  creator: string;
  creatorID: string;
}
