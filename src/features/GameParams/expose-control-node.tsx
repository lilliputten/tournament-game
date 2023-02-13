/** @module expose-control-node
 *  @desc Bare component to control GameParams events on the top level of react nodes
 *  @since 2023.01.29, 21:22
 *  @changed 2023.01.30, 00:35
 */

import { useEffect } from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { useRootStore } from '@/core/app/app-root-state';

import { fetchAppInfoAction } from './services/fetchAppInfo';
import { actions } from './reducer';

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const appRootStore = useRootStore();

  // Effect: Update data on essential parameters change
  useEffect(() => {
    const needReset = false;
    // Call actions...
    if (needReset) {
      dispatch(actions.resetData());
    }
    fetchAppInfoAction(appRootStore);
  }, [dispatch, appRootStore]);

  return null;
}
