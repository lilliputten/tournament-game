/** @module Search
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.12, 00:08
 */

import { AnyAction, createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TRootState } from '@/core/app/app-root-state';
import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

interface TResponseData {
  // Token: string; // '230209-185714-942-3589518'
  success: boolean | string;
  error?: string;
}
// TODO!
export type TFetchStartWaitingResult = void;
// export interface TFetchStartWaitingResult {
//   // token?: string;
// }

export interface TFetchStartWaitingParams {
  userName: string;
}

export interface TFetchStartWaitingQuery {
  name: string;
}

const requestErrorText = 'Ошибка запроса старта ожидания начала игры от сервера';

export async function fetchStartWaiting(
  params: TFetchStartWaitingParams,
): Promise<TFetchStartWaitingResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/waitingStart';
  const { userName } = params;
  const queryData: TFetchStartWaitingQuery = { name: userName };
  /* console.log('[fetchStartWaiting]: request start', {
   *   params,
   *   queryData,
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method, data: queryData })
    .then((data) => {
      const { success, error } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || 'Операция завершена с неопределённой ошибкой');
      }
      console.log('[fetchStartWaiting]: request done', data, {
        data,
        success,
        params,
        url,
      });
    })
    .catch((error) => {
      const errorText = requestErrorText;
      const errorMessage = errorText + ': ' + error.message;
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
  const { userName } = gameParamsState;
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
  };
  thunkDispatch(fetchStartWaitingThunk(params));
}
