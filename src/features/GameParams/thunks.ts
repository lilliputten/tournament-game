/** @module reducer
 *  @since 2023.01.28, 19:17
 *  @changed 2023.01.28, 23:31
 */

import { AnyAction, createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TGameParamsParams, TGameParamsSearchResult } from './types';
import { fetchGameParams } from './service';
import { RootState } from '@/core/app/app-reducer';

type TFetchGameParamsThunkParams = TGameParamsParams;

export const fetchGameParamsThunk = createAsyncThunk(
  'articles/fetchGameParamsThunk',
  async (params: TFetchGameParamsThunkParams): Promise<TGameParamsSearchResult> => {
    return await fetchGameParams(params);
  },
);

export function fetchGameParamsAction(rootStore: Store<RootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<RootState, void, AnyAction>;
  const articlesState = rootStore.getState().articles;
  const { query, sortMode, pageNo, pageSize, cardType } = articlesState;
  const params: TFetchGameParamsThunkParams = { query, sortMode, pageNo, pageSize, cardType };
  thunkDispatch(fetchGameParamsThunk(params));
}
