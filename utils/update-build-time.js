/** @desc Update build date/time tag file with current timestamp
 *  @changed 2023.01.26, 18:03
 */
/* eslint-disable no-console */

const fs = require('fs');
const { format } = require('date-fns');

const tagFormat = 'yyMMdd-HHmm';
const timeFormat = 'yyyy.MM.dd, HH:mm';

const now = new Date();
const buildTag = format(now, tagFormat);
const buildTime = format(now, timeFormat);

console.log('Updating build tag/time:', buildTag, '/', buildTime);

fs.writeFileSync('build-timetag.txt', buildTag, 'utf8');
fs.writeFileSync('build-timestamp.txt', buildTime, 'utf8');
