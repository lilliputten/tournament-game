export interface TAnswer {
  id: string;
  text: string;
  // correct?: boolean;
}
export interface TQuestion {
  id: string;
  question: string;
  answers: TAnswer[];
}
export type TQuestions = TQuestion[];
