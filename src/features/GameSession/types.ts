/** @module types
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.13, 20:21
 */

import { TGameMode, TPartnersInfo } from '@/core/types';
import { AnyAction, Reducer } from 'redux';

export interface TGameSessionState {
  // Game status...

  isPlaying: boolean; // Is game playing right now
  isFinished: boolean; // Is game finished

  // Game params...

  gameStatus?: string;
  gameResumed?: boolean;

  gameToken?: string;
  gameMode?: TGameMode;
  partnerToken?: string;
  partnerName?: string;

  // Other game params...

  partnersInfo?: TPartnersInfo;

  finishedStatus?: string; // none, all (?)
  finishedTimestamp?: number;
  finishedTimestr?: string;
  startedTimestamp?: number;
  startedTimestr?: string;

  // Questions...

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
