/** @module Search
 *  @since 2023.01.28, 15:57
 *  @changed 2023.02.10, 21:01
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
export interface TFetchAppInfoResult {
  token?: string;
}

export async function fetchAppInfo(): Promise<TFetchAppInfoResult> {
  const url = config.api.apiUrlPrefix + '/start';
  /* console.log('[fetchAppInfo]: request start', {
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url })
    .then((data) => {
      if (!data.Token) {
        throw new Error('Token not defined');
      }
      // Fetch data...
      const token = data.Token;
      /* console.log('[fetchAppInfo]: request done', data, {
       *   url,
       *   token,
       * });
       */
      const result: TFetchAppInfoResult = {
        token,
      };
      return result;
    })
    .catch((error) => {
      const errorText = 'Ошибка получения параметров приложения';
      const throwError = new Error(errorText + ': ' + error.message);
      // eslint-disable-next-line no-console
      console.error('[fetchAppInfo]: request catch', {
        throwError,
        error,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw throwError;
    });
}

export const fetchAppInfoThunk = createAsyncThunk(
  'articles/fetchAppInfoThunk',
  async (/* params: TFetchGameParamsThunkParams */): Promise<TFetchAppInfoResult> => {
    return await fetchAppInfo();
  },
);

export function fetchAppInfoAction(rootStore: Store<TRootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  thunkDispatch(fetchAppInfoThunk());
}
