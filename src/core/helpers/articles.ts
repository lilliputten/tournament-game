/** @module core/helpers/articles
 *  @since 2023.01.31, 20:43
 *  @changed 2023.01.31, 20:43
 */

import { TArticle, TRawArticle } from '../types';

/** Inject optional fields into main data object */
export function combineArticleData(item: TRawArticle): TArticle {
  const { fields, ...basicData } = item;
  return { ...basicData, ...fields };
}
