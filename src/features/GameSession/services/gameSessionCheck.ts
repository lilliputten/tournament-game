/** @module gameSessionCheck
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TPartnersInfo, TQuestionAnswers } from '@/core';

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: string; // ('waitingFinished')
  success: boolean; // true

  // Game params...
  // currentQuestionIdx?: number;
  // questionAnswers: TQuestionAnswers;
  partnersInfo: TPartnersInfo;

  gameStatus?: string;
}
export type TGameSessionCheckResult = Pick<
  TResponseData,
  'status' | 'reason' | 'partnersInfo' | 'gameStatus'
>;

export type TGameSessionCheckPayloadAction = PayloadAction<
  TGameSessionCheckResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка запроса проверки состояния игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function gameSessionCheck(): Promise<TGameSessionCheckResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/gameSessionCheck';
  /* console.log('[gameSessionCheck]: request start', {
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const { success, status, error, reason, partnersInfo, gameStatus } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      console.log('[gameSessionCheck]: request done', data, {
        gameStatus,
        partnersInfo,
        success,
        status,
        reason,
        url,
      });
      return { status, reason, partnersInfo, gameStatus };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[gameSessionCheck]: request catch', {
        error,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const gameSessionCheckThunk = createAsyncThunk(
  'articles/gameSessionCheckThunk',
  async (): Promise<TGameSessionCheckResult> => {
    return await gameSessionCheck();
  },
);
