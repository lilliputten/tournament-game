/** @module gameSessionSendAnswer
 *  @since 2023.02.16, 15:56
 *  @changed 2023.02.16, 15:56
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

export type TGameSessionSendAnswerStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: string;
  success: boolean; // true

  isCorrect: boolean;

  // TODO: Other params...
}
export type TGameSessionSendAnswerResult = Pick<TResponseData, 'status' | 'reason'> & {
  isCorrect: boolean;
};

export type TGameSessionSendAnswerPayloadAction = PayloadAction<
  TGameSessionSendAnswerResult,
  string,
  unknown,
  Error
>;

export interface TSessionSendAnswerParams {
  questionId: string;
  answerId: string;
}

const urlMethod = '/gameSessionCheckAnswer';
const requestErrorText = 'Ошибка запроса проверки ответа';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function gameSessionSendAnswer(
  params: TSessionSendAnswerParams,
): Promise<TGameSessionSendAnswerResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + urlMethod;
  const { questionId, answerId } = params;
  const queryData = {
    questionId,
    answerId,
  };
  console.log('[gameSessionSendAnswer]: request start', {
    queryData,
    params,
    method,
    url,
    urlMethod,
  });
  // debugger;
  return simpleDataFetch<TResponseData>({ url, method, data: queryData })
    .then((data) => {
      const { success, status, error, reason, isCorrect } = data;
      // Check possible errors...
      console.log('[gameSessionSendAnswer]: request done', data, {
        isCorrect,
        success,
        status,
        reason,
        queryData,
        params,
        url,
      });
      if (!success || error) {
        const throwError = new Error(error || reason || unknownErrorText);
        throw throwError;
      }
      return { status, reason, isCorrect };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[gameSessionSendAnswer]: request catch', {
        error,
        queryData,
        params,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const gameSessionSendAnswerThunk = createAsyncThunk(
  'articles/gameSessionSendAnswerThunk',
  async (params: TSessionSendAnswerParams): Promise<TGameSessionSendAnswerResult> => {
    return await gameSessionSendAnswer(params);
  },
);
