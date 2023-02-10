/** @module expose-control-node
 *  @desc Bare component to cintrol GameParams events on the top level of react nodes
 *  @since 2023.01.29, 21:22
 *  @changed 2023.01.30, 00:35
 */

import { useEffect } from 'react';
import { useStore } from 'react-redux';

import { useAppDispatch } from '@/core/app/app-store';
import { TRootState } from '@/core/app/app-root-state';

import { fetchAppInfoAction } from './services/fetchAppInfo';
import { resetData } from './reducer';

// type TMemo = TGameParamsParams;
// const defaultMemo = { ...defaultParams };

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const appStateStore = useStore<TRootState>();

  // const memo = useMemo<TMemo>(() => ({ ...defaultMemo }), []);

  // Effect: Update data on essential parameters change
  useEffect(() => {
    const needReset = false;
    // Call actions...
    if (needReset) {
      dispatch(resetData());
    }
    fetchAppInfoAction(appStateStore);
  }, [dispatch, appStateStore]);

  return null;
}
