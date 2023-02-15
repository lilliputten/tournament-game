/** @module types
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.14, 18:29
 */

import { AnyAction, Reducer } from 'redux';

import { TGameMode } from '@/core/types';

export interface TGameParamsState {
  token?: string;
  userName?: string;
  gameMode: TGameMode;

  hasStarted: boolean;

  // State...
  isLoading: boolean;
  error?: Error;
}

export type TGameParamsReducerType = Reducer<TGameParamsState, AnyAction>;
