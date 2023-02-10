/** @module constants
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.10, 18:26
 */

import { TGameParamsState } from './types';

// Default state
export const defaultState: TGameParamsState = {
  userName: undefined,
  token: undefined,
  gameMode: undefined,

  isLoading: false,
  error: undefined,
};
