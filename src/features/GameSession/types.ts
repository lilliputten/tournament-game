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
  gameStatus?: string;
  gameResumed?: boolean,

  // Game params...
  gameToken?: string;
  gameMode?: TGameMode;
  partnerToken?: string;
  partnerName?: string;

  currentQuestionIdx?: number;
  currentAnswerIdx?: number;
  currentAnswerIsCorrect?: boolean;

  partnersInfo?: TPartnersInfo;

  // Generic tate...
  loadingCount: number;
  isSessionChecking: boolean;
  isLoading: boolean;
  error?: Error;
}

export type TGameSessionReducerType = Reducer<TGameSessionState, AnyAction>;
