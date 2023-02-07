/** @module pageUtils
 *  @since 2022.02.02, 19:37
 *  @changed 2022.02.02, 19:37
 */

import * as siteConfig from '@/config/site';

export function subPageTitle(pageTitle: string): string {
  const { titleDelim, title: siteTitle } = siteConfig;
  const title = [pageTitle, siteTitle].filter(Boolean).join(titleDelim);
  return title;
}
