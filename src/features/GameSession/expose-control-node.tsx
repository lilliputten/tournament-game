/** @module expose-control-node
 *  @desc Bare component to control GameSession events on the top level of react nodes
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.14, 00:35
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { intervalPolling } from '@/core';
import { useGameSessionIsPlaying } from './expose-hooks';
import { gameSessionCheckThunk } from './services';
import { gameSessionCheckPollingTimeout } from './constants';
import { actions as gameSessionActions } from '@/features/GameSession/reducer';

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const isPlaying = useGameSessionIsPlaying();
  React.useEffect(() => {
    if (isPlaying) {
      console.log('[GameSession/expose-control-node]: start game');
      const playingPolling = intervalPolling(async () => {
        // console.log('[GameSession/expose-control-node]: game iteration');
        return dispatch(gameSessionCheckThunk());
      }, gameSessionCheckPollingTimeout);
      playingPolling.polling();
      return () => {
        console.log('[GameSession/expose-control-node]: stop game');
        playingPolling.close();
        // TODO: Reset game data?
        dispatch(gameSessionActions.resetData());
      };
    }
  }, [dispatch, isPlaying]);
  return null;
}
