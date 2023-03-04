import { TToken } from './tokens';

export type TAnswerId = string;
export type TQuestionId = string;
export interface TAnswer {
  id: TAnswerId;
  text: string;
  // correct?: boolean; // Only on server
}
export interface TQuestion {
  id: TQuestionId;
  question: string;
  answers: TAnswer[];
}
export type TQuestions = TQuestion[];

export type TAnswerResult = 'correct' | 'wrong';

export type TQuestionAnswers = Record<TQuestionId, TAnswerResult>;

export type TPartnerInfoStatus = 'finished' | 'playing';
export interface TPartnerInfo {
  name: string;
  questionAnswers?: TQuestionAnswers;
  status?: TPartnerInfoStatus;
  finishedTimestamp?: number;
  finishedTimestr?: number;
}
export type TPartnersInfo = Record<TToken, TPartnerInfo>;
