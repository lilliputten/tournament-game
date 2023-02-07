/** @module Search
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 20:43
 */

import axios from 'axios';

import config from '@/config';
import { defaultFieldsString } from '@/core/constants';
import {
  TArticleLoadParams,
  TArticleLoadQueryParams,
  TArticleLoadQueryResult,
  TArticleLoadResult,
} from './types';
import { combineArticleData } from '@/core/helpers';

// Fetch single article data by id

export async function fetchArticle(srcParams: TArticleLoadParams): Promise<TArticleLoadResult> {
  const { id, showFields } = srcParams;
  // TODO: Check for non-empty article id?
  const url = config.api.apiUrlPrefix + '/' + id;
  const params: TArticleLoadQueryParams = {
    'api-key': config.api.apiKey,
    'show-fields': showFields ? showFields.join(',') : defaultFieldsString,
  };
  try {
    const res = await axios.get<TArticleLoadQueryResult>(url, { params });
    const { data } = res;
    const response = data.response;
    const { content } = response;
    const article = combineArticleData(content);
    const resultData: TArticleLoadResult = {
      article,
    };
    return resultData;
  } catch (error) {
    // NOTE: Error type is AxiosError.
    // eslint-disable-next-line no-console
    console.error('[Search:fetchArticle]: request catch', {
      error,
      url,
      params,
      srcParams,
    });
    debugger; // eslint-disable-line no-debugger
    // TODO: Extend error with request parameters (url, params, srcParams, etc)?
    // TODO: Use our own error class, extending AxiosError?
    throw error;
  }
}
