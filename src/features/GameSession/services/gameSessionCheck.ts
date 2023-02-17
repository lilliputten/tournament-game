/** @module gameSessionCheck
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TPartnersInfo, TToken } from '@/core';

interface TResponseData {
  Token?: TToken;

  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: string; // ('waitingFinished')
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
}
export type TGameSessionCheckResult = Pick<
  TResponseData,
  | 'Token'
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

export type TGameSessionCheckPayloadAction = PayloadAction<
  TGameSessionCheckResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка запроса проверки состояния игры';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

/* // Data received when your partner has finished game
{
  Token: '230217-184643-640-5542545',
  finishedByPartner: '230213-170431-705-495361',
  finishedStatus: 'none',
  finishedTimestamp: 1676634418494,
  finishedTimestr: '2023.02.17 18:46:58',
  gameMode: 'multi',
  gameStatus: 'finished',
  gameToken: '230217-184643-640-5542545',
  lastAnswerTimestamp: 1676634416859,
  lastAnswerTimestr: '2023.02.17 18:46:56',
  lastAnsweredBy: '230213-170431-705-495361',
  lastCheckTimestamp: 1676634425909,
  lastCheckTimestr: '2023.02.17 18:47:05',
  lastCheckedBy: '230213-170431-705-495361',
  partners: [
    '230211-165455-365-5694359',
    '230213-170431-705-495361'
  ],
  partnersInfo: {
    '230211-165455-365-5694359': {
      name: 'aaa',
      questionAnswers: {},
      status: 'playing'
    },
    '230213-170431-705-495361': {
      name: 'fox',
      questionAnswers: {
        Test: 'correct'
      },
      status: 'finished'
    }
  },
  questionAnswers: {},
  reason: 'Game status checked',
  startedTimestamp: 1676634403640,
  startedTimestr: '2023.02.17 18:46:43',
  status: 'gameStatusResult',
  success: true,
  timestamp: 1676634425909,
  timestr: '2023.02.17 18:47:05'
}
*/

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
      const {
        Token,
        success,
        status,
        error,
        reason,
        // Game...
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
      /* console.log('[gameSessionCheck]: request done', data, {
       *   Token,
       *   gameStatus,
       *   gameMode,
       *   finishedStatus,
       *   finishedTimestamp,
       *   finishedTimestr,
       *   partnersInfo,
       *   startedTimestamp,
       *   startedTimestr,
       *   success,
       *   status,
       *   reason,
       *   url,
       * });
       */
      return {
        Token,
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
