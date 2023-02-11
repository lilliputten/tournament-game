/** @module expose-hooks
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.11, 17:02
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameSessionState } from './types';
import { selectors } from './reducer';

// GameSession reducers...
export const selectGameSessionState = (state: TRootState): TGameSessionState => state.gameSession;
export const useGameSessionState = (): TGameSessionState =>
  useTypedSelector((state) => selectGameSessionState(state));

// Basic (common) hooks...
export const useGameSessionLoading = (): ReturnType<typeof selectors.selectLoading> =>
  selectors.selectLoading(useGameSessionState());
export const useGameSessionError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useGameSessionState());
