/** @module types
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.02, 08:33
 */

import { TArticle, TArticleCommonParams, TArticleId, TRawArticle } from '@/core/types';

export interface TGameParamsState {
  userName: string;

  // State...
  isLoading: boolean;
  error?: Error;
}
