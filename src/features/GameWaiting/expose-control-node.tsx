/** @module expose-control-node
 *  @desc Bare component to control GameWaiting events on the top level of react nodes
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 21:51
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { intervalPolling } from '@/core';
import { useGameWaitingIsWaitingCycle } from './expose-hooks';
import { fetchCheckWaitingThunk, TFetchCheckWaitingPayloadAction } from './services';
import { gameWaitingPollingTimeout } from './constants';
// import { actions as gameSessionActions } from '@/features/GameSession/reducer';
import { gameSessionStartThunk } from '../GameSession/services';

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const isWaitingCycle = useGameWaitingIsWaitingCycle();
  React.useEffect(() => {
    if (isWaitingCycle) {
      console.log('[GameWaiting/expose-control-node]: start waiting');
      const waitingCyclePolling = intervalPolling(async () => {
        console.log('[GameWaiting/expose-control-node]: waiting iteration');
        return (
          dispatch(fetchCheckWaitingThunk())
            // TODO: Process iteratiion result?
            .then((action: TFetchCheckWaitingPayloadAction) => {
              const { status, reason, gameToken, partnerToken, partnerName } = action.payload;
              if (status === 'finished' && gameToken) {
                console.log('[GameWaiting/expose-control-node]: waiting finished', {
                  status,
                  action,
                  reason,
                  gameToken,
                  partnerToken,
                  partnerName,
                });
                // Start game...
                dispatch(gameSessionStartThunk());
              }
              return action;
            })
        );
      }, gameWaitingPollingTimeout);
      waitingCyclePolling.polling();
      return () => {
        console.log('[GameWaiting/expose-control-node]: stop waiting');
        waitingCyclePolling.close();
        // TODO: Reset some data?
      };
    }
  }, [dispatch, isWaitingCycle]);

  return null;
}
