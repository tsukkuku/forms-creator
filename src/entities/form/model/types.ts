import type { Timestamp } from "firebase/firestore";

export interface FormData {
  id: string;
  name?: string;
  createdAt?: Timestamp;
}
