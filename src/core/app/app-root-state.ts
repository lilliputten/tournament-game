import { shallowEqual, TypedUseSelectorHook, useSelector, useStore } from 'react-redux';

import { AnyAction, CombinedState, Reducer } from 'redux';

import { TGameParamsState } from '@/features/GameParams/types';

import { TGameSessionState } from '@/features/GameSession/types';

export interface TRootState {
  gameParams: TGameParamsState;
  gameSession: TGameSessionState;
}

export type TRootReducer = Reducer<CombinedState<TRootState>, AnyAction>;

// Generic reducers..
export type RootState = TRootState; // ReturnType<typeof rootReducer>;

export const useRootStore = () => useStore<TRootState>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);
