/** @module gameSessionStart
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.14, 00:26
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TGameMode } from '@/core/types';

export type TGameSessionStartStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionStartStatus;
  success: boolean; // true

  // Params...
  gameStatus?: string;
  gameToken?: string;
  gameMode?: TGameMode;
  partnerName?: string;
  partnerToken?: string;

  gameResumed?: boolean;
}
export type TGameSessionStartResult = Pick<
  TResponseData,
  | 'status'
  | 'reason'
  | 'gameToken'
  | 'gameMode'
  | 'partnerName'
  | 'partnerToken'
  | 'gameStatus'
  | 'gameResumed'
>;

export type TGameSessionStartPayloadAction = PayloadAction<
  TGameSessionStartResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка запроса старта игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function gameSessionStart(): Promise<TGameSessionStartResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/gameSessionStart';
  /* console.log('[gameSessionStart]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      /* Data sample (as on 2023.02.14, 00:23):
       * Token : "230211-165455-365-5694359"
       * gameToken : "230214-002100-815-6559809"
       * partnerName : "fox"
       * partnerToken : "230213-170431-705-495361"
       * reason : "Game started"
       * status : "playing"
       * success : true
       */
      const {
        success,
        status,
        error,
        reason,
        gameToken,
        gameMode,
        partnerName,
        partnerToken,
        gameStatus,
        gameResumed,
      } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      console.log('[gameSessionStart]: request done', data, {
        success,
        status,
        reason,
        url,
        gameToken,
        gameStatus,
        gameMode,
        partnerName,
        partnerToken,
        gameResumed,
      });
      return {
        status,
        reason,
        gameToken,
        gameMode,
        partnerName,
        partnerToken,
        gameStatus,
        gameResumed,
      };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[gameSessionStart]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const gameSessionStartThunk = createAsyncThunk(
  'articles/gameSessionStartThunk',
  async (): Promise<TGameSessionStartResult> => {
    return await gameSessionStart();
  },
);
