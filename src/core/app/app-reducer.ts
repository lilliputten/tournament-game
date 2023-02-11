/** @module app-reducer
 *  @since 2023.01.28, 21:01
 *  @changed 2023.02.11, 17:57
 */

import { combineReducers } from 'redux';

import { TRootReducer } from './app-root-state';

import { reducer as gameParams } from '@/features/GameParams/reducer';
export * from '@/features/GameParams/expose-hooks';

import { reducer as gameSession } from '@/features/GameSession/reducer';
export * from '@/features/GameSession/expose-hooks';

export const rootReducer: TRootReducer = combineReducers({
  gameParams,
  gameSession,
});
