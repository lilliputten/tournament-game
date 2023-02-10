/** @module simpleDataFetch
 *  @since 2023.02.10, 19:59
 *  @changed 2023.02.10, 20:05
 */

import axios, { AxiosRequestConfig } from 'axios';

import { apiUrlPrefix, defaultDataRequestHeaders } from '@/config/api';

interface TResponseError {
  code: number; //  404
  error: string; //  'Not Found'
  systemError?: string; //  'NotFound: 404 Not Found: The requested URL was not found on the server...'
  method: string; //  'GET'
  protocol: string; //  'http'
  url: string; //  'http://localhost:5000/api/v1.0/start'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TRequestParams = AxiosRequestConfig<any>;

export function simpleDataFetch<T>(params: TRequestParams): Promise<T> {
  const url = apiUrlPrefix + '/start';
  const requestParams = {
    method: 'get',
    url,
    withCredentials: true,
    ...params,
    headers: { ...defaultDataRequestHeaders, ...params.headers },
  };
  /* console.log('[simpleDataFetch]: request start', {
   *   requestParams,
   *   params,
   *   url,
   * });
   */
  return axios<T & TResponseError>(requestParams)
    .then((res) => {
      const { data } = res;
      // Check error...
      if (typeof data === 'string') {
        throw new Error('Server error (text): ' + data);
      } else if (data.error) {
        throw new Error('Server error (property): ' + data.error);
      }
      // Return data...
      return data;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('[simpleDataFetch]: request catch', {
        error,
        url,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    });
}
