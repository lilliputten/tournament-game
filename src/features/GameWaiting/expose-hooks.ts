/** @module expose-hooks
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameWaitingState } from './types';
import { selectors } from './reducer';

// GameWaiting reducers...
export const selectGameWaitingState = (state: TRootState): TGameWaitingState => state.gameWaiting;
export const useGameWaitingState = (): TGameWaitingState =>
  useTypedSelector((state) => selectGameWaitingState(state));

// Basic (common) hooks...
export const useGameWaitingIsLoading = (): ReturnType<typeof selectors.selectLoading> =>
  selectors.selectLoading(useGameWaitingState());
export const useGameWaitingError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useGameWaitingState());

// Custom hooks
export const useGameWaitingIsWaiting = (): ReturnType<typeof selectors.selectIsWaiting> =>
  selectors.selectIsWaiting(useGameWaitingState());
export const useGameWaitingIsWaitingCycle = (): ReturnType<typeof selectors.selectIsWaitingCycle> =>
  selectors.selectIsWaitingCycle(useGameWaitingState());
export const useGameWaitingIsStarted = (): ReturnType<typeof selectors.selectIsStarted> =>
  selectors.selectIsStarted(useGameWaitingState());
export const useGameWaitingIsFailed = (): ReturnType<typeof selectors.selectIsFailed> =>
  selectors.selectIsFailed(useGameWaitingState());

// Game...
export const useGameWaitingGameMode = (): ReturnType<typeof selectors.selectGameMode> =>
  selectors.selectGameMode(useGameWaitingState());
export const useGameWaitingGameToken = (): ReturnType<typeof selectors.selectGameToken> =>
  selectors.selectGameToken(useGameWaitingState());
export const useGameWaitingPartnerName = (): ReturnType<typeof selectors.selectPartnerName> =>
  selectors.selectPartnerName(useGameWaitingState());
export const useGameWaitingPartnerToken = (): ReturnType<typeof selectors.selectPartnerToken> =>
  selectors.selectPartnerToken(useGameWaitingState());
