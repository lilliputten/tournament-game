/** @module types
 *  @since 2023.02.13, 20:21
 *  @changed 2023.03.04, 21:51
 */

import { TFinishedStatus, TGameMode, TPartnersInfo, TQuestionId, TToken } from '@/core/types';
import { AnyAction, Reducer } from 'redux';

export interface TGameSessionState {
  // Game status...

  isPlaying: boolean; // Is game playing right now
  isFinished: boolean; // Is game finished

  // Game params...

  Token?: TToken;

  gameStatus?: string;
  gameResumed?: boolean;

  gameToken?: string;
  gameMode?: TGameMode;
  partnerToken?: string;
  partnerName?: string;

  // Other game params...

  partnersInfo?: TPartnersInfo;

  winnerToken?: TToken;
  isWinner?: boolean;

  finishedStatus?: TFinishedStatus; // none, all, some (?)
  finishedTimestamp?: number;
  finishedTimestr?: string;
  startedTimestamp?: number;
  startedTimestr?: string;

  // Questions...

  questionsIds?: TQuestionId[];

  currentQuestionIdx?: number;
  currentAnswerIdx?: number;
  currentAnswerIsCorrect?: boolean;

  // Generic state...

  loadingCount: number;
  isSessionChecking: boolean;
  isLoading: boolean;
  error?: Error;
}

export type TGameSessionReducerType = Reducer<TGameSessionState, AnyAction>;
