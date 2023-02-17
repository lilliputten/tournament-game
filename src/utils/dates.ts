/** @module strings
 *  @description Strings utilities
 *  @since 2023.02.01, 00:37
 *  @changed 2023.02.17, 18:05
 */

import * as constantsConfig from '@/config/constants';
import { format } from 'date-fns';
import { intervalToDuration } from 'date-fns';

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

export function getDurationString(start?: number, end?: number): string | undefined {
  const hasTimes = !!(end && start);
  if (!hasTimes) {
    return undefined;
  }
  const d = intervalToDuration({ start, end });
  /* duration object:
   * years : 0
   * months : 0
   * days : 0
   * hours : 0
   * minutes : 0
   * seconds : 6
   */
  const { years, months, days, hours, minutes, seconds } = d;
  const list = [
    years && String(years) + ' год(а)',
    months && String(months) + ' мес.',
    days && String(days) + ' дн.',
    hours && String(hours) + ' ч.',
    minutes && String(minutes) + ' мин.',
    seconds && String(seconds) + ' сек.',
  ].filter(Boolean);
  return list.join(' ');
}
