/** @module types
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.15, 02:41
 */

import { AnyAction, Reducer } from 'redux';

import { TQuestions } from '@/core/types';

export interface TQuestionsState {
  questions?: TQuestions;

  // State...
  loadingCount: number;
  isLoading: boolean;
  error?: Error;
}

export type TQuestionsReducerType = Reducer<TQuestionsState, AnyAction>;
