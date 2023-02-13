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

export const requestTimeout = buildConfig.isDev
  ? 180000 // DEBUG
  : 30000;

// Authorization...
export const apiUser = 'api';
export const apiPass = 'pusplndvqaivbynv';
const authStr = apiUser + ':' + apiPass;
// Authorization: Basic YXBpOnB1c3BsbmR2cWFpdmJ5bnY=
export const apiAuth = 'Basic ' + Buffer.from(authStr).toString('base64');

// export const apiKey = '4f726c71-33a7-4294-a1a4-88aec3824322';

// Request

export const defaultDataRequestHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Authorization: apiAuth,
};
