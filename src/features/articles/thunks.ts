/** @module reducer
 *  @since 2023.01.28, 19:17
 *  @changed 2023.01.28, 23:31
 */

import { AnyAction, createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { TArticlesParams, TArticlesSearchResult } from './types';
import { fetchArticles } from './service';
import { RootState } from '@/core/app/app-reducer';

type TFetchArticlesThunkParams = TArticlesParams;

export const fetchArticlesThunk = createAsyncThunk(
  'articles/fetchArticlesThunk',
  async (params: TFetchArticlesThunkParams): Promise<TArticlesSearchResult> => {
    return await fetchArticles(params);
  },
);

export function fetchArticlesAction(rootStore: Store<RootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<RootState, void, AnyAction>;
  const articlesState = rootStore.getState().articles;
  const { query, sortMode, pageNo, pageSize, cardType } = articlesState;
  const params: TFetchArticlesThunkParams = { query, sortMode, pageNo, pageSize, cardType };
  thunkDispatch(fetchArticlesThunk(params));
}
