import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import { AnyAction, CombinedState, Reducer } from 'redux';

import { TGameParamsState } from '@/features/GameParams/types';

export interface TRootState {
  gameParams: TGameParamsState;
}

export type TRootReducer = Reducer<CombinedState<TRootState>, AnyAction>;

// Generic reducers..
export type RootState = TRootState; // ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);
