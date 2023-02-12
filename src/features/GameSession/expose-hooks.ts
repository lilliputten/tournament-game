/** @module expose-hooks
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameSessionState } from './types';
import { selectors } from './reducer';

// GameSession reducers...
export const selectGameSessionState = (state: TRootState): TGameSessionState => state.gameSession;
export const useGameSessionState = (): TGameSessionState =>
  useTypedSelector((state) => selectGameSessionState(state));

// Basic (common) hooks...
export const useGameSessionIsLoading = (): ReturnType<typeof selectors.selectLoading> =>
  selectors.selectLoading(useGameSessionState());
export const useGameSessionError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useGameSessionState());

// Custom hooks
export const useGameSessionIsWaiting = (): ReturnType<typeof selectors.selectIsWaiting> =>
  selectors.selectIsWaiting(useGameSessionState());
export const useGameSessionIsWaitingCycle = (): ReturnType<typeof selectors.selectIsWaitingCycle> =>
  selectors.selectIsWaitingCycle(useGameSessionState());
export const useGameSessionIsStarted = (): ReturnType<typeof selectors.selectIsStarted> =>
  selectors.selectIsStarted(useGameSessionState());
export const useGameSessionIsFailed = (): ReturnType<typeof selectors.selectIsFailed> =>
  selectors.selectIsFailed(useGameSessionState());
