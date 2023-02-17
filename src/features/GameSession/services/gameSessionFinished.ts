/** @module gameSessionFinished
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

export type TGameSessionFinishedStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionFinishedStatus;
  success: boolean; // true

  // Other params...
  gameStatus?: string;
}
export type TGameSessionFinishedResult = Pick<TResponseData, 'status' | 'reason' | 'gameStatus'>;

export type TGameSessionFinishedPayloadAction = PayloadAction<
  TGameSessionFinishedResult,
  string,
  unknown,
  Error
>;

const urlMethod = '/gameSessionFinished';
const requestErrorText = 'Ошибка запроса завершения прохождения игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function gameSessionFinished(): Promise<TGameSessionFinishedResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + urlMethod;
  console.log('[gameSessionFinished]: request start', {
    method,
    url,
    urlMethod,
  });
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, status, error, reason, gameStatus } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      console.log('[gameSessionFinished]: request done', data, {
        gameStatus,
        success,
        status,
        reason,
        url,
        urlMethod,
      });
      return { status, reason, gameStatus };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[gameSessionFinished]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const gameSessionFinishedThunk = createAsyncThunk(
  'articles/gameSessionFinishedThunk',
  async (): Promise<TGameSessionFinishedResult> => {
    return await gameSessionFinished();
  },
);
