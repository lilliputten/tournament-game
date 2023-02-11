/** @module constants
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.11, 17:06
 */

import { TGameSessionState } from './types';

// Default state
export const defaultState: TGameSessionState = {
  token: undefined, // DEMO
  isWaiting: false,
  isStarted: false,

  isLoading: false,
  error: undefined,
};
