/** @module constants
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { TGameWaitingState } from './types';

// Default state
export const defaultState: TGameWaitingState = {
  isWaiting: false,
  isWaitingCycle: false,
  isStarted: false,
  isFailed: false,

  loadingCount: 0,
  isLoading: false,
  error: undefined,
};
