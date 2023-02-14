/** @module simpleDataFetch
 *  @since 2023.02.10, 19:59
 *  @changed 2023.02.14, 23:19
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import * as apiConfig from '@/config/api';

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

// Initiate cancel requests object
let source = axios.CancelToken.source();

// All active requests list
const activeRequests: Promise<AxiosResponse>[] = [];

export function simpleDataFetch<T>(params: TRequestParams): Promise<T> {
  // const url = apiUrlPrefix + '/start';
  const requestParams = {
    /* // Available parameters (@see https://github.com/axios/axios#request-config):
     * url?: string;
     * method?: Method;
     * baseURL?: string;
     * transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
     * transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
     * headers?: AxiosRequestHeaders;
     * params?: any;
     * paramsSerializer?: (params: any) => string;
     * data?: D;
     * timeout?: number;
     * timeoutErrorMessage?: string;
     * withCredentials?: boolean;
     * adapter?: AxiosAdapter;
     * auth?: AxiosBasicCredentials;
     * responseType?: ResponseType;
     * xsrfCookieName?: string;
     * xsrfHeaderName?: string;
     * onUploadProgress?: (progressEvent: any) => void;
     * onDownloadProgress?: (progressEvent: any) => void;
     * maxContentLength?: number;
     * validateStatus?: ((status: number) => boolean) | null;
     * maxBodyLength?: number;
     * maxRedirects?: number;
     * socketPath?: string | null;
     * httpAgent?: any;
     * httpsAgent?: any;
     * proxy?: AxiosProxyConfig | false;
     * cancelToken?: CancelToken;
     * decompress?: boolean;
     * transitional?: TransitionalOptions;
     * signal?: AbortSignal;
     * insecureHTTPParser?: boolean;
     */
    method: 'get',
    timeout: apiConfig.requestTimeout,
    withCredentials: true,
    ...params,
    headers: { ...apiConfig.defaultDataRequestHeaders, ...params.headers },
    cancelToken: source.token,
  };
  /* console.log('[simpleDataFetch]: request start', {
   *   requestParams,
   *   params,
   * });
   */
  // Start request
  const axiosRequest = axios<T & TResponseError>(requestParams);
  // Add axios request to active requests list
  activeRequests.push(axiosRequest);
  // Return operation promise...
  return axiosRequest
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
      const { response } = error;
      const data = response?.data;
      // Add server error (if present) to error message...
      if (typeof data === 'string') {
        const match = data.match(/\b(reason|error): (.*?)(\n|$)/);
        const matchText = match && match[2];
        if (matchText) {
          error.message += ' (Server error: ' + matchText + ')';
        }
      }
      const statusText = response?.statusText;
      // eslint-disable-next-line no-console
      console.error('[simpleDataFetch]: request catch', {
        data,
        statusText,
        error,
        params,
        requestParams,
      });
      // debugger; // eslint-disable-line no-debugger
      throw error;
    })
    .finally(() => {
      // Remove axios request from active requests list
      const p = activeRequests.indexOf(axiosRequest);
      if (p !== -1) {
        /* console.log('[simpleDataFetch:finally]', {
         *   axiosRequest,
         *   activeRequests,
         *   p,
         *   params,
         *   requestParams,
         * });
         */
        activeRequests.splice(p, 1);
      }
    });
}

export function cancelAllActiveRequests() {
  /* console.log('[simpleDataFetch:cancelAllActiveRequests]', {
   *   activeRequests,
   *   source,
   * });
   */
  // Cancel all registered requests
  source.cancel();
  // NOTE: Causes `CanceledError`.
  // Re-initiate cancel requests object
  source = axios.CancelToken.source();
}
