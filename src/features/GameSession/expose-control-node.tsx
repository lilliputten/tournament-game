/** @module expose-control-node
 *  @desc Bare component to cintrol GameSession events on the top level of react nodes
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 01:02
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { intervalPolling } from '@/core';
import { useGameSessionIsWaitingCycle } from './expose-hooks';
import { fetchCheckWaitingThunk, TFetchCheckWaitingPayloadAction } from './services';

const waitingCyclePollingTimeout = 5000;

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const isWaitingCycle = useGameSessionIsWaitingCycle();
  React.useEffect(() => {
    if (isWaitingCycle) {
      console.log('[src/features/GameSession/expose-control-node]: start requests cycle');
      const waitingCyclePolling = intervalPolling(async () => {
        console.log('[src/features/GameSession/expose-control-node]: iteration');
        return dispatch(fetchCheckWaitingThunk());
        /* // TODO: Process iteratiion result?
         * .then(
         *   (action: TFetchCheckWaitingPayloadAction) => {
         *     const { status } = action.payload;
         *     console.log('[src/features/GameSession/expose-control-node]: iteration result', {
         *       status,
         *       action,
         *     });
         *     // TODO? Or all actions can be accomplished in reducer (fetchCheckWaitingThunk.fulfilled)?
         *     // debugger;
         *     return action;
         *   },
         * );
         */
      }, waitingCyclePollingTimeout);
      waitingCyclePolling.polling();
      return () => {
        console.log('[src/features/GameSession/expose-control-node]: stop requests cycle');
        waitingCyclePolling.close();
      };
    }
  }, [isWaitingCycle]);

  return null;
}
