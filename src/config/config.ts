/** @module config
 *  @description App config
 *  @since 2023.01.26, 18:28
 *  @changed 2023.01.26, 18:28
 */

import * as api from './api';
import * as build from './build';
import * as constants from './constants';
import * as site from './site';

const config = {
  api,
  build,
  constants,
  site,
};

/* // Expose config as global variable. (Deprecated?)
 * // NOTE: Required fix in the `custom.d.ts`.
 * if (typeof global !== 'undefined') {
 *   global.config = config;
 * } else if (typeof window !== 'undefined') {
 *   window.config = config;
 * }
 */

export default config;
