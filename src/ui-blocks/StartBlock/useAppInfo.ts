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
    console.log('[useAppInfo:Effect]: request start', {
      url,
    });
    try {
      axios.get<TResponseData>(url).then((res) => {
        const { data } = res;
        const { Token: token } = data;
        console.log('[useAppInfo:Effect]: request done', {
          data,
        });
        // debugger;
        memo.token = token;
        memo.error = undefined;
        setResult({ ...memo });
      });
    } catch (error) {
      // NOTE: Error type is AxiosError.
      // eslint-disable-next-line no-console
      console.error('[useAppInfo:Effect]: request catch', {
        error,
        url,
      });
      debugger; // eslint-disable-line no-debugger
      // TODO: Extend error with request parameters (url, params, srcParams, etc)?
      // TODO: Use our own error class, extending AxiosError?
      // throw error;
      memo.error = error as Error;
      setResult({ ...memo });
    }
  }, [memo]);
  return result;
}
