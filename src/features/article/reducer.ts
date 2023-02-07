/** @module reducer
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 22:48
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { absentArticleTitle, loadingArticleTitle } from '@/config/site';
import { TArticle, TArticleId } from '@/core/types';
import { TFetchArticlePayloadAction, TArticleState } from './types';
import { initialState } from './constants';
import { fetchArticleThunk } from './thunks';

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticleId: (state, action: PayloadAction<TArticleId>) => {
      if (state.currentArticleId !== action.payload) {
        state.currentArticleId = action.payload;
        state.currentArticle = undefined;
        // TODO: To start loading?
      }
    },
    resetData: (state) => {
      state.error = undefined;
      state.currentArticleId = undefined;
      state.currentArticle = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        String(fetchArticleThunk.pending),
        (state: TArticleState, _action: TFetchArticlePayloadAction) => {
          state.isLoading = true;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchArticleThunk.fulfilled),
        (state: TArticleState, action: TFetchArticlePayloadAction) => {
          const { payload } = action;
          const { article } = payload;
          state.currentArticle = article;
          state.isLoading = false;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchArticleThunk.rejected),
        (state: TArticleState, action: TFetchArticlePayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[features/articles/reducer:fetchArticleThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          state.error = error;
          state.isLoading = false;
        },
      );
  },
});

// See reducers creation in `src/app/app-reducer.ts`
export const selectLoading = (state: TArticleState): TArticleState['isLoading'] => state.isLoading;
export const selectError = (state: TArticleState): TArticleState['error'] => state.error;
export const selectCurrentArticleId = (state: TArticleState): TArticleId | undefined =>
  state.currentArticleId;
export const selectCurrentArticle = (state: TArticleState): TArticle | undefined =>
  state.currentArticle;
export const selectCurrentArticleTitle = (state: TArticleState): string =>
  state.currentArticle?.webTitle || (state.isLoading ? loadingArticleTitle : absentArticleTitle);

export const { setCurrentArticleId, resetData } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
