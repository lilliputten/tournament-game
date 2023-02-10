import { useEffect, useMemo, useState } from 'react';

import { fetchAppInfo, TFetchAppInfoResult } from '@/features/GameParams/services/fetchAppInfo';

interface TUseAppInfoResult extends TFetchAppInfoResult {
  error?: Error;
}

const defaultResult = {};

export function useAppInfo(): TUseAppInfoResult {
  const [result, setResult] = useState<TUseAppInfoResult>({ ...defaultResult });
  const memo = useMemo<TUseAppInfoResult>(() => ({ ...defaultResult }), []);
  useEffect(() => {
    fetchAppInfo()
      .then((result) => {
        const { token } = result;
        /*
         * console.log('[useAppInfo:Effect]: request done', result, {
         *   token,
         * });
         */
        memo.token = token;
        memo.error = undefined;
        setResult({ ...memo });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('[useAppInfo:Effect]: request catch', {
          error,
        });
        debugger; // eslint-disable-line no-debugger
        memo.error = error as Error;
        memo.token = undefined;
        setResult({ ...memo });
      });
  }, [memo]);
  return result;
}
