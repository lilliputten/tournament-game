/** @module expose-hooks
 *  @since 2023.02.10, 18:35
 *  @changed 2023.02.10, 18:35
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameParamsState } from './types';
import * as gameParamsReducer from './reducer';

// GameParams reducers...
export const selectGameParamsState = (state: TRootState): TGameParamsState => state.gameParams;
export const useGameParamsState = (): TGameParamsState =>
  useTypedSelector((state) => selectGameParamsState(state));
export const useGameParamsLoading = (): ReturnType<typeof gameParamsReducer.selectLoading> =>
  gameParamsReducer.selectLoading(useGameParamsState());
export const useGameParamsError = (): ReturnType<typeof gameParamsReducer.selectError> =>
  gameParamsReducer.selectError(useGameParamsState());

export const useGameParamsToken = (): ReturnType<typeof gameParamsReducer.selectToken> =>
  gameParamsReducer.selectToken(useGameParamsState());
export const useGameParamsUserName = (): ReturnType<typeof gameParamsReducer.selectUserName> =>
  gameParamsReducer.selectUserName(useGameParamsState());
export const useGameParamsGameMode = (): ReturnType<typeof gameParamsReducer.selectGameMode> =>
  gameParamsReducer.selectGameMode(useGameParamsState());
