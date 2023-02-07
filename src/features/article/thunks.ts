/** @module reducer
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 22:23
 */

import { createAsyncThunk, Store, ThunkDispatch } from '@reduxjs/toolkit';

import { RootState } from '@/core/app/app-reducer';
import { TArticleLoadParams, TArticleLoadResult, TFetchArticlePayloadAction } from './types';
import { fetchArticle } from './service';

type TFetchArticleThunkParams = TArticleLoadParams;

export const fetchArticleThunk = createAsyncThunk(
  'article/fetchArticleThunk',
  async (params: TFetchArticleThunkParams): Promise<TArticleLoadResult> => {
    return await fetchArticle(params);
  },
);

export function fetchArticleAction(rootStore: Store<RootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<
    RootState,
    void,
    TFetchArticlePayloadAction
  >;
  const articleState = rootStore.getState().article;
  const { currentArticleId } = articleState;
  if (currentArticleId) {
    // TODO: Check for non-empty article id?
    const params: TFetchArticleThunkParams = { id: currentArticleId };
    thunkDispatch(fetchArticleThunk(params));
  }
  // TODO: To return promise? Need type definition (smth like `Promise<TFetchArticlePayloadAction>`)
}
