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

  // Game params...

  gameStatus: undefined,
  gameResumed: undefined,

  gameToken: undefined,
  gameMode: undefined,
  partnerToken: undefined,
  partnerName: undefined,

  // Other game params...

  partnersInfo: undefined,

  finishedStatus: undefined,
  finishedTimestamp: undefined,
  finishedTimestr: undefined,
  startedTimestamp: undefined,
  startedTimestr: undefined,

  // Questions...

  questionsIds: undefined,

  currentQuestionIdx: undefined,
  currentAnswerIdx: undefined,
  currentAnswerIsCorrect: undefined,

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
