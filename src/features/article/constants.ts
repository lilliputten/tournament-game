/** @module constants
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 21:24
 */

import { TArticleState } from './types';

// Default state
export const initialState: TArticleState = {
  currentArticleId: undefined,
  currentArticle: undefined,

  isLoading: false,
  error: undefined,
};

export const defaultArticleParams = {
  id: undefined,
};
