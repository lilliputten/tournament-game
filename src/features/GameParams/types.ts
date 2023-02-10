/** @module types
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.10, 18:26
 */

import { AnyAction, Reducer } from 'redux';

export type TGameMode = 'single' | 'multi';

export interface TGameParamsState {
  token?: string;
  userName?: string;
  gameMode?: TGameMode;

  // State...
  isLoading: boolean;
  error?: Error;
}

export type TGameParamsReducerType = Reducer<TGameParamsState, AnyAction>;
