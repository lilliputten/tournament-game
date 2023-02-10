import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import config from '@/config';

interface TResponseData {
  Token: string; // '230209-185714-942-3589518'
  ip: string; // '127.0.0.1'
  resumedSession: string; // false
  timestamp: string; // 1675943834956
  timestr: string; // '2023.02.09 18:57:14'
}
interface TResponseError {
  code: number; //  404
  error: string; //  'Not Found'
  systemError?: string; //  'NotFound: 404 Not Found: The requested URL was not found on the server...'
  method: string; //  'GET'
  protocol: string; //  'http'
  url: string; //  'http://localhost:5000/api/v1.0/start'
}
interface TResult {
  token?: string;
  error?: Error;
}
const defaultResult = {};

export function useAppInfo(): TResult {
  const [result, setResult] = useState<TResult>({ ...defaultResult });
  const memo = useMemo<TResult>(() => ({ ...defaultResult }), []);
  useEffect(() => {
    const url = config.api.apiUrlPrefix + '/start';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: config.api.apiAuth,
    };
    console.log('[useAppInfo:Effect]: request start', {
      headers,
      url,
    });
    axios<TResponseData & TResponseError>({
      method: 'get',
      url,
      withCredentials: true,
      headers,
    })
      .then((res) => {
        const { data } = res;
        // Check error...
        if (typeof data === 'string') {
          throw new Error('Server error (text): ' + data);
        } else if (data.error) {
          throw new Error('Server error (property): ' + data.error);
        } else if (!data.Token) {
          throw new Error('Token not defined');
        }
        // Fetch data...
        console.log('[useAppInfo:Effect]: request done', data, { url });
        // debugger;
        memo.token = data.Token;
        memo.error = undefined;
        setResult({ ...memo });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('[useAppInfo:Effect]: request catch', {
          error,
          url,
        });
        // debugger; // eslint-disable-line no-debugger
        memo.error = error as Error;
        memo.token = undefined;
        setResult({ ...memo });
      });
  }, [memo]);
  return result;
}
