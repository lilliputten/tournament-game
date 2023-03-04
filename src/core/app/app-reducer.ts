/** @module app-reducer
 *  @since 2023.01.28, 21:01
 *  @changed 2023.03.05, 04:30
 */

import { combineReducers } from 'redux';

import { TRootReducer } from './app-root-state';

import { reducer as gameParams } from '@/features/GameParams/reducer';
export * from '@/features/GameParams/expose-hooks';

import { reducer as gameWaiting } from '@/features/GameWaiting/reducer';
export * from '@/features/GameWaiting/expose-hooks';

import { reducer as gameSession } from '@/features/GameSession/reducer';
export * from '@/features/GameSession/expose-hooks';

import { reducer as questions } from '@/features/Questions/reducer';
export * from '@/features/Questions/expose-hooks';

import { reducer as resultsTable } from '@/features/RecordsTable/reducer';
export * from '@/features/RecordsTable/expose-hooks';

export const rootReducer: TRootReducer = combineReducers({
  gameParams,
  gameWaiting,
  gameSession,
  questions,
  resultsTable,
});
