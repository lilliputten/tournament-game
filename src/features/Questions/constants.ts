/** @module constants
 *  @since 2023.02.15, 02:42
 *  @changed 2023.02.15, 02:42
 */

import { TQuestionsState } from './types';

// Default state
export const defaultState: TQuestionsState = {
  questions: undefined,

  // State...
  loadingCount: 0,
  isLoading: false,
  error: undefined,
};
