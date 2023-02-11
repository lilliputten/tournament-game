/** @module Search
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.11, 17:02
 */

import { AnyAction, createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TRootState } from '@/core/app/app-root-state';
import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

interface TResponseData {
  Token: string; // '230209-185714-942-3589518'
  ip: string; // '127.0.0.1'
  resumedSession: string; // false
  timestamp: string; // 1675943834956
  timestr: string; // '2023.02.09 18:57:14'
}

// TODO!
export interface TFetchAppInfoResult {
  token?: string;
}

export interface TFetchWaitingParams {
  userName: string;
  token: string;
}

export interface TFetchWaitingQuery {
  userName: string;
  Token: string;
}

export async function fetchWaiting(params: TFetchWaitingParams): Promise<TFetchAppInfoResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/waiting';
  const { token, userName } = params;
  const queryData = { Token: token, userName };
  console.log('[fetchWaiting]: request start', {
    params,
    queryData,
    url,
  });
  return simpleDataFetch<TResponseData>({ url, method, data: queryData })
    .then((data) => {
      if (!data.Token) {
        const error = new Error('Token is not defined');
        // eslint-disable-next-line no-console
        console.error('[fetchWaiting]: request error', {
          error,
          params,
          queryData,
          method,
          url,
        });
        debugger; // eslint-disable-line no-debugger
        throw error;
      }
      // Fetch data...
      const token = data.Token;
      const result: TFetchAppInfoResult = {
        token,
      };
      console.log('[fetchWaiting]: request done', data, {
        token,
        result,
        data,
        queryData,
        method,
        url,
      });
      debugger;
      return result;
    })
    .catch((error) => {
      const errorText = 'Ошибка запроса ожидания начала игры от сервера';
      const throwError = new Error(errorText + ': ' + error.message);
      // eslint-disable-next-line no-console
      console.error('[fetchWaiting]: request catch', {
        throwError,
        error,
        queryData,
        method,
        url,
      });
      debugger; // eslint-disable-line no-debugger
      throw throwError;
    });
}

export const fetchWaitingThunk = createAsyncThunk(
  'articles/fetchWaitingThunk',
  async (params: TFetchWaitingParams): Promise<TFetchAppInfoResult> => {
    return await fetchWaiting(params);
  },
);

export function fetchWaitingAction(rootStore: Store<TRootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  const gameParamsState = rootStore.getState().gameParams;
  const { token, userName } = gameParamsState;
  console.log('[fetchWaiting:fetchWaitingAction]: start', {
    token,
    userName,
    gameParamsState,
  });
  // Process possible errors...
  if (!token) {
    const error = new Error('Token is not defined');
    // eslint-disable-next-line no-console
    console.error('[fetchWaiting:fetchWaitingAction]: error', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  if (!userName) {
    const error = new Error('User name is not defined');
    // eslint-disable-next-line no-console
    console.error('[fetchWaiting:fetchWaitingAction]: error', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  // Prepare parameters and start thunk...
  const params: TFetchWaitingParams = {
    token,
    userName,
  };
  thunkDispatch(fetchWaitingThunk(params));
}
