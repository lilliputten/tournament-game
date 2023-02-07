/** @module config.constants
 *  @description Basic constants
 *  @since 2023.01.26, 18:28
 *  @changed 2023.01.26, 18:28
 */

/** Date conversion & presentation templates... */

// Date/time formats for use in DatePicker and other date/time-related
// components, @see: https://date-fns.org/v2.16.1/docs/format
export const dateFormat = 'yyyy.MM.dd';
export const timeFormat = 'HH:mm';
export const timeSecFormat = 'HH:mm:ss';
export const timeMsFormat = 'HH:mm:ss:SSS';
export const dateTimeFormat = dateFormat + ' ' + timeFormat;
export const dateTimeSecFormat = dateFormat + ' ' + timeSecFormat;
export const dateTimeMsFormat = dateFormat + ' ' + timeMsFormat;
export const dateRangeDelim = ' – ';

export const timeIntervals = 60;
export const minuteTicks = 1000 * 60;
export const hourTicks = minuteTicks * 60;
export const dayTicks = hourTicks * 24;
export const weekTicks = dayTicks * 7;

/** App title parts delimiter */

export const defaultQuote = '"';
export const squareOpen = '[';
export const squareClose = ']';
export const curlyOpen = '{';
export const curlyClose = '}';

export const errRegExp = /^Error[:\n\r\s]*/m;
export const errDelim = '\n'; // <br/>\n';
export const errDelim2 = errDelim + errDelim;
export const ellipsis = '…'; // '...';

export const maxShowStringLength = 300;
