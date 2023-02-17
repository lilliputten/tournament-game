/** @module gameSessionFinished
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TPartnersInfo } from '@/core';

export type TGameSessionFinishedStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionFinishedStatus;
  success: boolean; // true

  // Game params...
  gameStatus?: string;
  gameMode?: string;

  finishedStatus?: string; // none, all (?)
  finishedTimestamp?: number;
  finishedTimestr?: string;
  partnersInfo?: TPartnersInfo;
  startedTimestamp?: number;
  startedTimestr?: string;

  // 'gameStatus' | 'gameMode' | 'finishedStatus' | 'finishedTimestamp' | 'finishedTimestr' | 'partnersInfo' | 'startedTimestamp' | 'startedTimestr'
  // gameStatus, gameMode, finishedStatus, finishedTimestamp, finishedTimestr, partnersInfo, startedTimestamp, startedTimestr
}
export type TGameSessionFinishedResult = Pick<
  TResponseData,
  | 'status'
  | 'reason'
  | 'gameStatus'
  | 'gameMode'
  | 'finishedStatus'
  | 'finishedTimestamp'
  | 'finishedTimestr'
  | 'partnersInfo'
  | 'startedTimestamp'
  | 'startedTimestr'
>;

export type TGameSessionFinishedPayloadAction = PayloadAction<
  TGameSessionFinishedResult,
  string,
  unknown,
  Error
>;

const urlMethod = '/gameSessionFinished';
const requestErrorText = 'Ошибка запроса завершения прохождения игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

/* Sample result data:
{
  Token: '230217-165128-468-8647510',
  finishedByPartner: '230211-165455-365-5694359',
  finishedStatus: 'none',
  finishedTimestamp: 1676627496769,
  finishedTimestr: '2023.02.17 16:51:36',
  gameMode: 'single',
  gameStatus: 'finished',
  gameToken: '230217-165128-468-8647510',
  lastAnswerTimestamp: 1676627494933,
  lastAnswerTimestr: '2023.02.17 16:51:34',
  lastAnsweredBy: '230211-165455-365-5694359',
  lastCheckTimestamp: 1676627491313,
  lastCheckTimestr: '2023.02.17 16:51:31',
  lastCheckedBy: '230211-165455-365-5694359',
  partners: [
    '230211-165455-365-5694359'
  ],
  partnersInfo: {
    '230211-165455-365-5694359': {
      name: 'aaa',
      questionAnswers: {
        Test: 'wrong'
      },
      status: 'finished'
    }
  },
  reason: 'Game finished',
  startedTimestamp: 1676627488468,
  startedTimestr: '2023.02.17 16:51:28',
  status: 'gameFinished',
  success: true,
  timestamp: 1676627496769,
  timestr: '2023.02.17 16:51:36'
}
*/

export async function gameSessionFinished(): Promise<TGameSessionFinishedResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + urlMethod;
  /* console.log('[gameSessionFinished]: request start', {
   *   method,
   *   url,
   *   urlMethod,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method })
    .then((data) => {
      const {
        success,
        status,
        error,
        reason,
        gameStatus,
        gameMode,
        finishedStatus,
        finishedTimestamp,
        finishedTimestr,
        partnersInfo,
        startedTimestamp,
        startedTimestr,
      } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || reason || unknownErrorText);
      }
      /* console.log('[gameSessionFinished]: request done', data, {
       *   gameStatus,
       *   success,
       *   status,
       *   reason,
       *   url,
       *   urlMethod,
       * });
       */
      return {
        status,
        reason,
        gameStatus,
        gameMode,
        finishedStatus,
        finishedTimestamp,
        finishedTimestr,
        partnersInfo,
        startedTimestamp,
        startedTimestr,
      };
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
