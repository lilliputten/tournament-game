export interface TAnswer {
  text: string;
  correct?: boolean;
}
export interface TQuestion {
  id: string;
  question: string;
  answers: TAnswer[];
}
export type TQuestions = TQuestion[];
