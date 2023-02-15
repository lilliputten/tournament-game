/** @module expose-hooks
 *  @since 2023.02.15, 02:53
 *  @changed 2023.02.15, 02:53
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TQuestionsState } from './types';
import { selectors } from './reducer';

// Questions reducers...
export const selectQuestionsState = (state: TRootState): TQuestionsState => state.questions;
export const useQuestionsState = (): TQuestionsState =>
  useTypedSelector((state) => selectQuestionsState(state));

// Basic (common) hooks...
export const useQuestionsIsLoading = (): ReturnType<typeof selectors.selectIsLoading> =>
  selectors.selectIsLoading(useQuestionsState());
export const useQuestionsError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useQuestionsState());

// Custom hooks
export const useQuestions = (): ReturnType<typeof selectors.selectQuestions> =>
  selectors.selectQuestions(useQuestionsState());
