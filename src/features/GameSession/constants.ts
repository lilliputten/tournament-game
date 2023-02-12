/** @module constants
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { TGameSessionState } from './types';

// Default state
export const defaultState: TGameSessionState = {
  isWaiting: false,
  isWaitingCycle: false,
  isStarted: false,
  isFailed: false,

  loadingCount: 0,
  isLoading: false,
  error: undefined,
};
