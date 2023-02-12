/** @module fetchCheckWaiting
 *  @since 2023.02.13, 00:06
 *  @changed 2023.02.13, 00:42
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { CallTrackerReportInformation } from 'assert';

export type TFetchCheckWaitingStatus = 'waiting' | 'finished' | 'failed';

interface TResponseData {
  success: boolean | string;
  status: TFetchCheckWaitingStatus;
  partnerToken?: string;
  partnerName?: string;
  error?: string;
}
export type TFetchCheckWaitingResult = Pick<
  TResponseData,
  'status' | 'partnerToken' | 'partnerName'
>;

export type TFetchCheckWaitingPayloadAction = PayloadAction<
  TFetchCheckWaitingResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка запроса проверки статуса ожидания начала игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function fetchCheckWaiting(): Promise<TFetchCheckWaitingResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/waitingCheck';
  console.log('[fetchCheckWaiting]: request start', {
    method,
    url,
  });
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, status, error } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || unknownErrorText);
      }
      if (status === 'finished') {
        // Success!
        const { partnerToken, partnerName } = data;
        console.log('[fetchCheckWaiting]: request done: finished', data, {
          partnerToken,
          partnerName,
          status,
        });
        debugger;
        return { status, partnerToken, partnerName };
      }
      console.log('[fetchCheckWaiting]: request done', data, {
        success,
        status,
        url,
      });
      // debugger;
      return { status };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[fetchCheckWaiting]: request catch', {
        error,
        method,
        url,
      });
      debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const fetchCheckWaitingThunk = createAsyncThunk(
  'articles/fetchCheckWaitingThunk',
  async (): Promise<TFetchCheckWaitingResult> => {
    return await fetchCheckWaiting();
  },
);
