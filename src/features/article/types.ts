/** @module types
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 20:43
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { TArticle, TArticleCommonParams, TArticleId, TRawArticle } from '@/core/types';

export interface TArticleParams {
  id?: TArticleId;
}
export type TArticleLoadParams = Required<TArticleParams> & TArticleCommonParams;
export interface TArticleState {
  // Current article...
  currentArticleId?: TArticleId;
  currentArticle?: TArticle;

  // State...
  isLoading: boolean;
  error?: Error;
}

export interface TArticleLoadResult {
  article: TArticle;
}

interface TArticleLoadQueryResponse {
  content: TRawArticle;
}
export interface TArticleLoadQueryResult {
  response: TArticleLoadQueryResponse;
}

export interface TArticleLoadQueryParams {
  // id: TArticleId; // ID passed in url path! The ID for an item, such as a piece of content, is the path to that item on the site. By replacing the domain with content.guardianapis.com you get the API URL for that piece of content.
  'show-fields'?: string; // Add fields associated with the content
  'api-key': string; // The API key used for the query
}

export type TFetchArticlePayloadAction = PayloadAction<TArticleLoadResult, string, unknown, Error>;
