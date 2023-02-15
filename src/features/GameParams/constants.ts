/** @module constants
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.14, 19:49
 */

import { defaultGameMode } from '@/core/types';
import { TGameParamsState } from './types';

// Default state
export const defaultState: TGameParamsState = {
  userName: undefined,
  token: undefined,
  gameMode: defaultGameMode,

  hasStarted: false,

  isLoading: false,
  error: undefined,
};
