/** @module Search
 *  @since 2023.02.12, 21:48
 *  @changed 2023.02.12, 21:48
 */

import { createAsyncThunk } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

interface TResponseData {
  success: boolean | string;
  error?: string;
}
export type TSendStopWaitingResult = void;
export type TSendStopWaitingParams = void;

const requestErrorText = 'Ошибка запроса отмена ожидания начала игры от сервера';

export async function sendStopWaiting(/* params: TSendStopWaitingParams */): Promise<TSendStopWaitingResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/waitingStop';
  /* console.log('[sendStopWaiting]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, error } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || 'Операция завершена с неопределённой ошибкой');
      }
      console.log('[sendStopWaiting]: request done', data, {
        data,
        success,
        url,
      });
    })
    .catch((error) => {
      const errorText = requestErrorText;
      const errorMessage = errorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[sendStopWaiting]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const sendStopWaitingThunk = createAsyncThunk(
  'articles/sendStopWaitingThunk',
  async (/* params: TSendStopWaitingParams */): Promise<TSendStopWaitingResult> => {
    return await sendStopWaiting();
  },
);
