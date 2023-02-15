export interface TAnswer {
  text: string;
  correct?: boolean;
}
export interface TQuestion {
  question: string;
  answers: TAnswer[];
}
export type TQuestions = TQuestion[];
