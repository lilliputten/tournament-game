/** @module expose-control-node
 *  @desc Bare component to control GameWaiting events on the top level of react nodes
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.14, 15:25
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { intervalPolling } from '@/core';
import { useGameWaitingIsWaitingCycle } from './expose-hooks';
import { fetchCheckWaitingThunk } from './services';
import { gameWaitingPollingTimeout } from './constants';

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const isWaitingCycle = useGameWaitingIsWaitingCycle();
  React.useEffect(() => {
    if (isWaitingCycle) {
      /* console.log('[GameWaiting/expose-control-node]: start waiting');
       */
      const waitingCyclePolling = intervalPolling(async () => {
        // console.log('[GameWaiting/expose-control-node]: waiting iteration');
        return dispatch(fetchCheckWaitingThunk()) /*.then(
          (action: TFetchCheckWaitingPayloadAction) => {
            console.log('[[GameWaiting/expose-control-node]: iteration]', { action });
            debugger;
            return action;
          },
        )*/;
      }, gameWaitingPollingTimeout);
      waitingCyclePolling.polling();
      return () => {
        /* console.log('[GameWaiting/expose-control-node]: stop waiting');
         */
        waitingCyclePolling.close();
        // TODO: Reset some data?
      };
    }
  }, [dispatch, isWaitingCycle]);

  return null;
}
