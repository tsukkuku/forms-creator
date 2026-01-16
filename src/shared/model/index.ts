import type { Timestamp } from "firebase/firestore";

export interface FormData {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updateAt: Timestamp;
  creator: string;
  creatorID: string;
  color: string;
  questions: Question[];
}

export interface Question {
  id: string;
  name: string;
  description: string;
  type: QuestionTypes;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
}

export type QuestionTypes = "one" | "many" | "short" | "long";
