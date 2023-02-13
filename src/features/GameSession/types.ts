/** @module types
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { AnyAction, Reducer } from 'redux';

export interface TGameSessionState {
  isWaiting: boolean; // Waiting for partner match and game start
  isWaitingCycle: boolean; // Waiting cycle started
  isStarted: boolean; // Is game started
  isFailed: boolean; // Is game start failed (partner not found)

  // State...
  loadingCount: number;
  isLoading: boolean;
  error?: Error;
}

export type TGameSessionReducerType = Reducer<TGameSessionState, AnyAction>;