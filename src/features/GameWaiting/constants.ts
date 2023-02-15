/** @module constants
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 21:12
 */

import * as buildConfig from '@/config/build';
import { TGameWaitingState } from './types';

// Default state
export const defaultState: TGameWaitingState = {
  // States...
  isWaiting: false,
  isWaitingCycle: false,
  isGameStarted: false,
  isFailed: false,

  // Game...
  gameMode: undefined,
  gameToken: undefined,
  partnerName: undefined,
  partnerToken: undefined,

  // Loading...
  loadingCount: 0,
  isLoading: false,
  error: undefined,
};

// Delay for requesting game status
export const gameWaitingPollingTimeout = buildConfig.isDev
  ? 10000 // DEBUG
  : 5000;
