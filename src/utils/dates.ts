/** @module strings
 *  @description Strings utilities
 *  @since 2023.02.01, 00:37
 *  @changed 2023.02.02, 08:19
 */

import * as constantsConfig from '@/config/constants';
import { format } from 'date-fns';

export function formatIsoDateString(dateStr: string, formatStr?: string): string {
  if (!formatStr) {
    formatStr = constantsConfig.dateTimeFormat;
  }
  // XXX: Is it bug? Eg: '0012-11-16T16:31:15Z'? -> Change it to 20XX. Is it correct?
  if (dateStr.startsWith('00')) {
    dateStr = dateStr.replace(/^00/, '20');
  }
  const date = new Date(dateStr);
  return format(date, formatStr);
}
