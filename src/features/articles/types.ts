/** @module types
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.02, 08:33
 */

import { TArticleCardType } from '@/components';
import { TArticle, TArticleCommonParams, TArticleId, TRawArticle } from '@/core/types';

export interface TArticlesParams {
  query: string;
  sortMode: TSortMode;
  pageNo: number;
  pageSize: number;
  // DEBUG: Allow to change article preview card type for demonstration purposes.
  cardType: TArticleCardType;
}

// Application-level parameters (will be translated to `TArticlesSearchQueryParams`):
export type TArticlesSearchParams = Partial<TArticlesParams> & TArticleCommonParams;
export interface TArticlesState extends TArticlesParams {
  // Articles list...
  ids: TArticleId[];
  articlesHash: Record<TArticleId, TArticle>;
  articles: TArticle[];

  // State...
  isLoading: boolean;
  error?: Error;
}

/* // Info:
 * @see https://open-platform.theguardian.com/documentation/search
 * example: https://content.guardianapis.com/search?q=12%20years%20a%20slave&format=json&tag=film/film,tone/reviews&from-date=2010-01-01&show-tags=contributor&show-fields=starRating,headline,thumbnail,short-url&show-refinements=all&order-by=relevance
 * example details:
 * - q=12 years a slave
 * - format=json
 * - tag=film/film,tone/reviews
 * - from-date=2010-01-01
 * - show-tags=contributor
 * - show-fields=starRating,headline,thumbnail,short-url
 * - show-refinements=all
 * - order-by=relevance
 */

// TODO: Add TSection?
// @see https://open-platform.theguardian.com/documentation/section

// NOTE: Export sort modes ids (`sortModeIds`) to use in sort control.
export const sortModeIds = [
  'newest',
  'oldest',
  // 'relevance', // UNUSED!
] as const;
// Sort mode type (from ids list)
export type TSortMode = (typeof sortModeIds)[number];

export interface TArticlesSearchInfo {
  // NOTE: Indices start with 1, not 0!
  status: string; // 'ok',
  userTier: string; // 'developer',
  total: number; // 1,
  startIndex: number; // 1,
  pageSize: number; // 10,
  currentPage: number; // 1,
  pages: number; // 1,
  sortMode: TSortMode; // 'newest',
}

interface TArticlesSearchQueryResponse extends TArticlesSearchInfo {
  results: TRawArticle[];
}

export interface TArticlesSearchQueryResult {
  response: TArticlesSearchQueryResponse;
}

export interface TArticlesSearchResult {
  info: TArticlesSearchInfo;
  articles: TArticle[];
}

export interface TArticlesSearchQueryParams {
  q?: string; // Request content containing this free text. Supports AND, OR and NOT operators, and exact phrase queries using double quotes.
  page?: number; // Return only the result set from a particular page Integer e.g. 5
  'page-size'?: number; // Modify the number of items displayed per page  Integer 1 to 50
  'order-by'?: TSortMode; // Returns results in the specified order  String  See list below. newest - Default in all other cases. oldest. relevance - Default where q parameter is specified.
  'show-fields'?: string; // Add fields associated with the content
  'api-key': string; // The API key used for the query
}
