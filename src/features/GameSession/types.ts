/** @module types
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.13, 20:21
 */

import { AnyAction, Reducer } from 'redux';

export interface TGameSessionState {
  isPlaying: boolean; // Is game playing right now
  isFinished: boolean; // Is game finished

  gameToken?: string;
  partnerToken?: string;
  partnerName?: string;

  // State...
  loadingCount: number;
  isLoading: boolean;
  error?: Error;
}

export type TGameSessionReducerType = Reducer<TGameSessionState, AnyAction>;
