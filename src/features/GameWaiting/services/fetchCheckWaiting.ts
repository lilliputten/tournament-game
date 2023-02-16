/** @module fetchCheckWaiting
 *  @since 2023.02.13, 00:06
 *  @changed 2023.02.13, 00:42
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TFetchCheckWaitingStatus, TGameMode } from '@/core/types';

interface TResponseData {
  // Data fields from server response as on 2023.02.13, 17:56

  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TFetchCheckWaitingStatus; // ('waitingFinished')
  success: boolean; // true

  // Waiting from date/time...
  timestamp?: number; // (1676285683570)
  timestr?: string; // ('2023.02.13 17:54:43')

  // Game start date/time...
  gameTimeStr?: number; // ('2023.02.13 17:54:44')
  gameTimestamp?: string; // (1676285684078)

  // Game info...
  gameRecordId?: number; // Technical parameter, debugging only (2)
  gameToken?: string; // ('230213-175444-095-7818545')
  gameMode?: TGameMode;

  // Your own info (echoed)...
  Token?: string; // Your token ('230211-165455-365-5694359')
  name?: string; // Your own name ('aaa')
  ip?: string; // ('127.0.0.1')

  // Partner info...
  partnerName?: string; // 'fox'
  partnerToken?: string; // '230213-170431-705-495361'
}
export type TFetchCheckWaitingResult = Pick<
  TResponseData,
  'status' | 'reason' | 'partnerToken' | 'partnerName' | 'gameToken'
> & { gameMode?: TGameMode };

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
  /* console.log('[fetchCheckWaiting]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, status, error, reason, gameMode } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      if (status === 'waitingFinished') {
        // Success!
        const { partnerToken, partnerName, gameToken } = data;
        /* console.log('[fetchCheckWaiting]: request done: finished', data, {
         *   partnerToken,
         *   partnerName,
         *   gameToken,
         *   gameMode,
         *   status,
         *   reason,
         * });
         */
        return { status, reason, partnerToken, partnerName, gameToken, gameMode };
      }
      /* console.log('[fetchCheckWaiting]: request done', data, {
       *   gameMode,
       *   success,
       *   status,
       *   reason,
       *   url,
       * });
       */
      return { status, reason, gameMode };
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
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const fetchCheckWaitingThunk = createAsyncThunk(
  'articles/fetchCheckWaitingThunk',
  async (): Promise<TFetchCheckWaitingResult> => {
    return await fetchCheckWaiting();
  },
);
