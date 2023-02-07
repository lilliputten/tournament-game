/** @module app-reducer
 *  @since 2023.01.28, 21:01
 *  @changed 2023.01.31, 21:19
 */

import { combineReducers } from 'redux';
import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import { TArticleId } from '@/core/types';
import { TArticlesState } from '@/features/articles';
import * as articlesReducer from '@/features/articles/reducer';
import { TArticleState } from '@/features/article';
import * as articleReducer from '@/features/article/reducer';

export const rootReducer = combineReducers({
  articles: articlesReducer.articlesReducer,
  article: articleReducer.articleReducer,
});

// Genberic reducers..
export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);

// Articles reducers...
export const selectArticlesState = (state: RootState): TArticlesState => state.articles;
export const useArticlesState = (): TArticlesState =>
  useTypedSelector((state) => selectArticlesState(state));
export const useArticlesLoading = (): ReturnType<typeof articlesReducer.selectLoading> =>
  articlesReducer.selectLoading(useArticlesState());
export const useArticlesError = (): ReturnType<typeof articlesReducer.selectError> =>
  articlesReducer.selectError(useArticlesState());
export const useArticlesIds = (): ReturnType<typeof articlesReducer.selectArticleIds> =>
  articlesReducer.selectArticleIds(useArticlesState());
export const useArticles = (): ReturnType<typeof articlesReducer.selectArticles> =>
  articlesReducer.selectArticles(useArticlesState());
export const useArticleFromListById = (
  id: TArticleId,
): ReturnType<typeof articlesReducer.selectArticleById> =>
  articlesReducer.selectArticleById(useArticlesState(), id);
export const useArticlesSearchParams = (): ReturnType<typeof articlesReducer.selectParams> =>
  articlesReducer.selectParams(useArticlesState());

// Article reducers...
export const selectArticleState = (state: RootState): TArticleState => state.article;
export const useArticleState = (): TArticleState =>
  useTypedSelector((state) => selectArticleState(state));
export const useArticleLoading = (): ReturnType<typeof articleReducer.selectLoading> =>
  articleReducer.selectLoading(useArticleState());
export const useArticleError = (): ReturnType<typeof articleReducer.selectError> =>
  articleReducer.selectError(useArticleState());
export const useCurrentArticleId = (): ReturnType<typeof articleReducer.selectCurrentArticleId> =>
  articleReducer.selectCurrentArticleId(useArticleState());
export const useCurrentArticle = (): ReturnType<typeof articleReducer.selectCurrentArticle> =>
  articleReducer.selectCurrentArticle(useArticleState());
export const useCurrentArticleTitle = (): ReturnType<
  typeof articleReducer.selectCurrentArticleTitle
> => articleReducer.selectCurrentArticleTitle(useArticleState());
