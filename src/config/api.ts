/** @module config.api
 *  @since 2023.01.26, 18:28
 *  @changed 2023.02.10, 00:30
 */

import * as buildConfig from './build';

const useDebugApi = true;

export const apiHost =
  useDebugApi && buildConfig.isDev
    ? 'http://localhost:5000' // Debug api
    : 'https://tournament-game.march.team';

export const apiRoot = '/api/v1.0';
export const apiUrlPrefix = apiHost + apiRoot;

// Authorization...
export const apiKey = '4f726c71-33a7-4294-a1a4-88aec3824322';
