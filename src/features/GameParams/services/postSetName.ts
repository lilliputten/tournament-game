/** @module Search
 *  @since 2023.01.28, 15:57
 *  @changed 2023.02.11, 21:36
 */

import { AnyAction, createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TRootState } from '@/core/app/app-root-state';
import config from '@/config';
import { simpleDataFetch } from '@/core/helpers/simpleDataFetch';

interface TResponseData {
  Token: string; // '230209-185714-942-3589518'
  success: boolean | string;
  error?: string;
}
export interface TPostSetNameResult {
  token?: string;
  // success?: string | boolean;
}

export interface TSetNameParams {
  name: string;
}

export async function postSetName(params: TSetNameParams): Promise<TPostSetNameResult> {
  const method = 'POST';
  const url = config.api.apiUrlPrefix + '/setName';
  const { name } = params;
  const queryData = {
    name,
  };
  /* console.log('[postSetName]: request start', {
   *   queryData,
   *   params,
   *   method,
   *   url,
   * });
   */
  return simpleDataFetch<TResponseData>({ url, method, data: queryData })
    .then((data) => {
      const { Token: token, success, error } = data;
      // Check possible errors...
      if (!success || error) {
        throw new Error(error || 'Операция завершена с неопределённой ошибкой');
      }
      if (!token) {
        throw new Error('Не получен токен сессии!');
      }
      // Fetch data...
      const result: TPostSetNameResult = {
        token,
      };
      /* console.log('[postSetName]: request done', data, {
       *   result,
       *   success,
       *   token,
       *   url,
       * });
       */
      return result;
    })
    .catch((error) => {
      const errorText = 'Ошибка сохранения имени';
      const throwError = new Error(errorText + ': ' + error.message);
      // eslint-disable-next-line no-console
      console.error('[postSetName]: request catch', {
        error,
        queryData,
        params,
        method,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw throwError;
    });
}

// Thunk
export const postSetNameThunk = createAsyncThunk(
  'articles/postSetNameThunk',
  async (params: TSetNameParams): Promise<TPostSetNameResult> => {
    return await postSetName(params);
  },
);

// Action
export function postSetNameAction(rootStore: Store<TRootState>, params: TSetNameParams): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  thunkDispatch(postSetNameThunk(params));
}
