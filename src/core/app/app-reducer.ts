/** @module app-reducer
 *  @since 2023.01.28, 21:01
 *  @changed 2023.02.10, 21:52
 */

import { combineReducers } from 'redux';

import { TRootReducer } from './app-root-state';

import * as gameParamsReducer from '@/features/GameParams/reducer';
export * from '@/features/GameParams/expose-hooks';

export const rootReducer: TRootReducer = combineReducers({
  gameParams: gameParamsReducer.reducer,
});
