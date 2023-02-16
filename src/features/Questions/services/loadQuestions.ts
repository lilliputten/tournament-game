/** @module loadQuestions
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.14, 00:26
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TQuestions } from '@/core/types';

export type TLoadQuestionsStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  success: boolean; // true

  questions?: TQuestions;
}
export type TLoadQuestionsResult = Pick<TResponseData, 'reason' | 'questions'>;

export type TLoadQuestionsPayloadAction = PayloadAction<
  TLoadQuestionsResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка получения списка вопросов';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function loadQuestions(): Promise<TLoadQuestionsResult> {
  const method = 'GET';
  const url = config.api.apiUrlPrefix + '/loadQuestions';
  /* console.log('[loadQuestions]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, error, reason, questions } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      /* console.log('[loadQuestions]: request done', data, {
       *   success,
       *   reason,
       *   url,
       *   questions,
       * });
       */
      return { reason, questions };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[loadQuestions]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const loadQuestionsThunk = createAsyncThunk(
  'articles/loadQuestionsThunk',
  async (): Promise<TLoadQuestionsResult> => {
    return await loadQuestions();
  },
);
