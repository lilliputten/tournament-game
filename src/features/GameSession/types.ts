/** @module types
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.11, 17:06
 */

import { AnyAction, Reducer } from 'redux';

export interface TGameSessionState {
  token?: string; // DEMO
  isWaiting: boolean; // Waiting for partner match and game start
  isStarted: boolean; // Is game started

  // State...
  isLoading: boolean;
  error?: Error;
}

export type TGameSessionReducerType = Reducer<TGameSessionState, AnyAction>;
