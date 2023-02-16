/** @module gameSessionStop
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

export type TGameSessionStopStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionStopStatus;
  success: boolean; // true

  // TODO: Other params...
}
export type TGameSessionStopResult = Pick<TResponseData, 'status' | 'reason'>;

export type TGameSessionStopPayloadAction = PayloadAction<
  TGameSessionStopResult,
  string,
  unknown,
  Error
>;

const urlMethod = '/gameSessionStop';
const requestErrorText = 'Ошибка запроса завершения игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function gameSessionStop(): Promise<TGameSessionStopResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + urlMethod;
  console.log('[gameSessionStop]: request start', {
    method,
    url,
    urlMethod,
  });
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, status, error, reason } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      console.log('[gameSessionStop]: request done', data, {
        success,
        status,
        reason,
        url,
        urlMethod,
      });
      return { status, reason };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[gameSessionStop]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const gameSessionStopThunk = createAsyncThunk(
  'articles/gameSessionStopThunk',
  async (): Promise<TGameSessionStopResult> => {
    return await gameSessionStop();
  },
);
