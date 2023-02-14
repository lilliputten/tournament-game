/** @module constants
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.13, 20:21
 */

import * as buildConfig from '@/config/build';
import { TGameSessionState } from './types';

// Default state
export const defaultState: TGameSessionState = {
  isPlaying: false, // Is game playing
  isFinished: false, // Is game finished

  gameToken: undefined,
  partnerToken: undefined,
  partnerName: undefined,

  loadingCount: 0,
  isLoading: false,
  error: undefined,
};

// Delay for requesting game status
export const gameSessionCheckPollingTimeout = buildConfig.isDev
  ? 10000 // DEBUG
  : 5000;
