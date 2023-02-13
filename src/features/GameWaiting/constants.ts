/** @module constants
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 21:12
 */

import * as buildConfig from '@/config/build';
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

// Delay for requesting game status
export const gameWaitingPollingTimeout = buildConfig.isDev
  ? 10000 // DEBUG
  : 5000;
