/** @module expose-hooks
 *  @since 2023.02.10, 18:35
 *  @changed 2023.02.10, 18:35
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameParamsState } from './types';
import { selectors } from './reducer';

// GameParams reducers...
export const selectGameParamsState = (state: TRootState): TGameParamsState => state.gameParams;
export const useGameParamsState = (): TGameParamsState =>
  useTypedSelector((state) => selectGameParamsState(state));

// Basic (common) hooks...
export const useGameParamsLoading = (): ReturnType<typeof selectors.selectLoading> =>
  selectors.selectLoading(useGameParamsState());
export const useGameParamsError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useGameParamsState());

// Custom hooks...
export const useGameParamsToken = (): ReturnType<typeof selectors.selectToken> =>
  selectors.selectToken(useGameParamsState());
export const useGameParamsUserName = (): ReturnType<typeof selectors.selectUserName> =>
  selectors.selectUserName(useGameParamsState());
export const useGameParamsGameMode = (): ReturnType<typeof selectors.selectGameMode> =>
  selectors.selectGameMode(useGameParamsState());
