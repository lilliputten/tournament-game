export interface TAnswer {
  text: string;
  correct?: boolean;
}
export interface TQuestion {
  question: string;
  qnswers: TAnswer[];
}
export type TQuestions = TQuestion[];
