/** @module reducer
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.02, 08:33
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TArticle, TArticleId } from '@/core/types';
import { TGameParamsSearchResult, TSortMode, TGameParamsState, TGameParamsParams } from './types';
import { initialState, startPageNo } from './constants';
import { fetchGameParamsThunk } from './thunks';
import { TArticleCardType } from '@/components';

type GameParamsPayloadAction = PayloadAction<TGameParamsSearchResult, string, unknown, Error>;

function getUniqueArticleId(ids: TArticleId[], id: TArticleId): TArticleId {
  let newId = id;
  let count = 0;
  while (ids.includes(newId)) {
    newId = id + '-DUP-' + ++count;
  }
  return newId;
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortMode: (state, action: PayloadAction<TSortMode>) => {
      state.sortMode = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setNextPage: (state) => {
      state.pageNo = state.pageNo + 1;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    // DEBUG: Allow to change article preview card type for demonstration purposes.
    setCardType: (state, action: PayloadAction<TArticleCardType>) => {
      state.cardType = action.payload;
    },
    resetData: (state) => {
      state.error = undefined;
      state.ids = [];
      state.articles = [];
      state.articlesHash = {};
      state.pageNo = startPageNo; // ???
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        String(fetchGameParamsThunk.pending),
        (state: TGameParamsState, _action: GameParamsPayloadAction) => {
          state.isLoading = true;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchGameParamsThunk.fulfilled),
        (state: TGameParamsState, action: GameParamsPayloadAction) => {
          const { payload } = action;
          const { info, articles } = payload;
          /* // Info data sample (NOTE: Indices start with 1, not 0!):
           * status: 'ok',
           * userTier: 'developer',
           * total: 2402038,
           * startIndex: 1,
           * pageSize: 5,
           * currentPage: 1,
           * pages: 480408,
           * orderBy: 'newest'
           */
          const { startIndex } = info;
          const start = startIndex - 1; // NOTE: Indices start with 1, not 0!
          const newIds = [...state.ids];
          const newGameParams = [...state.articles];
          const newGameParamsHash = { ...state.articlesHash };
          for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const { id } = article;
            if (newIds.includes(id)) {
              // NOTE: Sometimes one article may appear several times in one
              // list (especially we fetching it with delayed chunks).
              const uniqueId = getUniqueArticleId(newIds, id);
              article.uniqueId = uniqueId;
              // eslint-disable-next-line no-console
              console.warn('[articles/reducer:fetchGameParamsThunk.fulfilled]: duplicated id', {
                id,
                uniqueId,
              });
            }
            // TODO: Check for duplicate items?
            newIds[start + i] = id;
            newGameParams[start + i] = article;
            newGameParamsHash[id] = article;
          }
          state.ids = newIds;
          state.articles = newGameParams;
          state.articlesHash = newGameParamsHash;
          state.isLoading = false;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchGameParamsThunk.rejected),
        (state: TGameParamsState, action: GameParamsPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[features/articles/reducer:fetchGameParamsThunk.rejected]', {
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
export const selectLoading = (state: TGameParamsState): TGameParamsState['isLoading'] =>
  state.isLoading;
export const selectError = (state: TGameParamsState): TGameParamsState['error'] => state.error;
export const selectArticleIds = (state: TGameParamsState): TArticleId[] => state.ids;
export const selectGameParams = (state: TGameParamsState): TArticle[] => state.articles;
export const selectGameParamsHash = (state: TGameParamsState): Record<TArticleId, TArticle> =>
  state.articlesHash;
export const selectArticleById = (state: TGameParamsState, id: TArticleId): TArticle | undefined =>
  state.articlesHash[id];
export const selectParams = (state: TGameParamsState): TGameParamsParams => {
  // TODO: To memoize entire params object?
  const { query, sortMode, pageNo, pageSize, cardType } = state;
  return { query, sortMode, pageNo, pageSize, cardType };
};

export const {
  setQuery,
  setSortMode,
  setPageNo,
  setNextPage,
  setPageSize,
  setCardType,
  resetData,
} = articlesSlice.actions;

export const articlesReducer = articlesSlice.reducer;
