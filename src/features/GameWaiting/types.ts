/** @module types
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { TGameMode } from '@/core/types';
import { AnyAction, Reducer } from 'redux';

export interface TGameWaitingState {
  // States...
  isWaiting: boolean; // Waiting for partner match and game start
  isWaitingCycle: boolean; // Waiting cycle started
  isStarted: boolean; // Is game started
  isFailed: boolean; // Is game start failed (partner not found)

  // Game...
  gameMode?: TGameMode;
  gameToken?: string;
  partnerName?: string;
  partnerToken?: string;

  // Loading...
  loadingCount: number;
  isLoading: boolean;
  error?: Error;
}

export type TGameWaitingReducerType = Reducer<TGameWaitingState, AnyAction>;
