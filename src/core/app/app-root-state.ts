/** @module app-root-state
 *  @since 2023.01.28, 21:01
 *  @changed 2023.02.13, 20:38
 */

import { shallowEqual, TypedUseSelectorHook, useSelector, useStore } from 'react-redux';

import { AnyAction, CombinedState, Reducer } from 'redux';

import { TGameParamsState } from '@/features/GameParams/types';
import { TGameWaitingState } from '@/features/GameWaiting/types';
import { TGameSessionState } from '@/features/GameSession/types';

export interface TRootState {
  gameParams: TGameParamsState;
  gameWaiting: TGameWaitingState;
  gameSession: TGameSessionState;
}

export type TRootReducer = Reducer<CombinedState<TRootState>, AnyAction>;

// Generic reducers..
export type RootState = TRootState; // ReturnType<typeof rootReducer>;

export const useRootStore = () => useStore<TRootState>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);
