/** @module loadRecordsTable
 *  @since 2023.03.05, 04:16
 *  @changed 2023.03.05, 05:10
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TRecordsTable } from '@/core/types';

export type TLoadRecordsTableStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  success: boolean; // true

  results?: TRecordsTable;
}
export type TLoadRecordsTableResult = Pick<TResponseData, 'reason' | 'results'>;

export type TLoadRecordsTablePayloadAction = PayloadAction<
  TLoadRecordsTableResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка получения таблицы результатов';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

// TODO: Pass gameMode?

export async function loadRecordsTable(): Promise<TLoadRecordsTableResult> {
  const method = 'GET';
  const url = config.api.apiUrlPrefix + '/loadResults';
  /*
   * console.log('[loadRecordsTable]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, error, reason, results } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      /* console.log('[loadRecordsTable]: request done', data, {
       *   success,
       *   reason,
       *   url,
       *   results,
       * });
       */
      return { reason, results };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[loadRecordsTable]: request catch', {
        error,
        method,
        url,
      });
      debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const loadRecordsTableThunk = createAsyncThunk(
  'articles/loadRecordsTableThunk',
  async (): Promise<TLoadRecordsTableResult> => {
    return await loadRecordsTable();
  },
);
