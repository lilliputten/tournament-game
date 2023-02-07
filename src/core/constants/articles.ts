/** @module core/constants/articles
 *  @since 2023.01.28, 19:17
 *  @changed 2023.01.31, 16:46
 */

import { TShowFieldsList } from '../types';

// Default options list for `show-fields` parameter (unused items are commented out):
const defaultFieldsList: TShowFieldsList = [
  // 'all', // Includes all the fields
  // 'allowUgc', // May have associated User Generated Content. This typically means the content has an associated Guardian Witness assignment which can be accessed by querying show-references=witness-assignment -- String (Boolean)
  'body', // String (HTML)
  'byline', // String (HTML)
  // 'commentCloseDate', // The date the comments have been closed -- Datetime
  // 'commentable', // String (Boolean)
  // 'hasStoryPackage', // Has related content selected by editors -- String (boolean)
  // 'headline', // String (HTML) (Same as webTitle from TRawArticle.)
  // 'internalPageCode', // String
  // 'isPremoderated', // Comments will be checked by a moderator prior to publication if true -- String (Boolean)
  // 'lastModified', // Datetime
  // 'liveBloggingNow', // Content is currently live blogged if true -- String (Boolean)
  // 'productionOffice', // String
  'publication', // String
  'score', // A relevance score based on the search query used -- String (float)
  'shortUrl', // String
  // 'shouldHideAdverts', // Adverts will not be displayed if true -- String (Boolean)
  // 'showInRelatedContent', // Whether this content can appear in automatically generated Related Content -- String (boolean)
  // 'standfirst', // String (HTML) (Same as trailText, but without wrapping tag.)
  // 'starRating', // String (Integer)
  'thumbnail', // String
  'trailText', // String (HTML)
  // 'wordcount', // String (Integer)
];

// Plain options list string
export const defaultFieldsString = defaultFieldsList.join(',');
