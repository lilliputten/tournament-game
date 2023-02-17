/** @module constants
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.13, 20:21
 */

import * as buildConfig from '@/config/build';
import { TGameSessionState } from './types';

// Default state
export const defaultState: TGameSessionState = {
  // Game status...
  isPlaying: false, // Is game playing
  isFinished: false, // Is game finished
  gameStatus: undefined,
  gameResumed: undefined,

  // Game params...
  gameToken: undefined,
  gameMode: undefined,
  partnerToken: undefined,
  partnerName: undefined,

  currentQuestionIdx: undefined,
  currentAnswerIdx: undefined,
  currentAnswerIsCorrect: undefined,

  partnersInfo: undefined,

  // Generic status...
  loadingCount: 0,
  isSessionChecking: false,
  isLoading: false,
  error: undefined,
};

// Delay for requesting game status
export const gameSessionCheckPollingTimeout = buildConfig.isDev
  ? 15000 // DEBUG
  : 15000;
