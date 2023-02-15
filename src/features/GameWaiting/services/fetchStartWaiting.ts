/** @module fetchStartWaiting
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { AnyAction, createAsyncThunk, PayloadAction, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TRootState } from '@/core/app/app-root-state';
import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';
import { TFetchCheckWaitingStatus } from '@/core/types';
import { TGameParamsState } from '@/features/GameParams/types';
import { defaultGameMode } from '@/core/types';
import { TGameWaitingState } from '../types';

interface TResponseData {
  reason?: string;
  status?: TFetchCheckWaitingStatus;
  success: boolean | string;
  error?: string;

  // Game?
  gameMode?: TGameParamsState['gameMode'];
  gameToken?: TGameWaitingState['gameToken'];
  partnerName?: TGameParamsState['userName'];
  partnerToken?: TGameParamsState['token'];
}
export interface TFetchStartWaitingResult {
  reason?: string;
  status?: TFetchCheckWaitingStatus;

  // Game?
  gameMode?: TResponseData['gameMode'];
  gameToken?: TResponseData['gameToken'];
  partnerName?: TResponseData['partnerName'];
  partnerToken?: TResponseData['partnerToken'];
}

export interface TFetchStartWaitingParams {
  userName: Required<TGameParamsState['userName']>;
  gameMode: Required<TGameParamsState['gameMode']>;
}

export interface TFetchStartWaitingQuery {
  name: Required<TGameParamsState['userName']>;
  gameMode: Required<TGameParamsState['gameMode']>;
}

export type TFetchStartWaitingPayloadAction = PayloadAction<
  TFetchStartWaitingResult,
  string,
  unknown,
  Error
>;

const requestErrorText = 'Ошибка запроса старта ожидания начала игры от сервера';
const unknownErrorText = 'Операция завершена с неопределённой ошибкой';

export async function fetchStartWaiting(
  params: TFetchStartWaitingParams,
): Promise<TFetchStartWaitingResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/waitingStart';
  const { userName, gameMode } = params;
  const queryData: TFetchStartWaitingQuery = { name: userName, gameMode };
  /* console.log('[fetchStartWaiting]: request start', {
   *   params,
   *   queryData,
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method, data: queryData })
    .then((data): TFetchStartWaitingResult => {
      const {
        // Base...
        success,
        error,
        reason,
        status,
        // Game...
        gameMode,
        gameToken,
        partnerName,
        partnerToken,
      } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || unknownErrorText);
      }
      /* console.log('[fetchStartWaiting]: request done', data, {
       *   // Status...
       *   reason,
       *   status,
       *   success,
       *   // Game...
       *   gameMode,
       *   gameToken,
       *   partnerName,
       *   partnerToken,
       *   // Base
       *   params,
       *   url,
       * });
       */
      return {
        // Status...
        reason,
        status,
        // Game...
        gameMode,
        gameToken,
        partnerName,
        partnerToken,
      };
    })
    .catch((error) => {
      const errorMessage = requestErrorText + ': ' + error.message;
      error.message = errorMessage;
      // eslint-disable-next-line no-console
      console.error('[fetchStartWaiting]: request catch', {
        error,
        queryData,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}

export const fetchStartWaitingThunk = createAsyncThunk(
  'articles/fetchStartWaitingThunk',
  async (params: TFetchStartWaitingParams): Promise<TFetchStartWaitingResult> => {
    return await fetchStartWaiting(params);
  },
);

export function fetchStartWaitingAction(rootStore: Store<TRootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  const gameParamsState = rootStore.getState().gameParams;
  const { userName, gameMode = defaultGameMode } = gameParamsState;
  /* console.log('[fetchStartWaiting:fetchStartWaitingAction]: start', {
   *   userName,
   *   gameParamsState,
   * });
   */
  if (!userName) {
    const error = new Error('User name is not defined');
    // eslint-disable-next-line no-console
    console.error('[fetchStartWaiting:fetchStartWaitingAction]: error', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  // Prepare parameters and start thunk...
  const params: TFetchStartWaitingParams = {
    userName,
    gameMode,
  };
  thunkDispatch(fetchStartWaitingThunk(params));
}
