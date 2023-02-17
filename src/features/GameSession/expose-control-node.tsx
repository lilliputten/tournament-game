/** @module expose-control-node
 *  @desc Bare component to control GameSession events on the top level of react nodes
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.17, 17:39
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { intervalPolling } from '@/core/helpers';
import { useGameSessionIsFinished, useGameSessionIsPlaying } from './expose-hooks';
import {
  gameSessionCheckThunk,
  getGameSessionQuestionIdxThunk,
  TGameSessionQuestionIdxPayloadAction,
} from './services';
import { gameSessionCheckPollingTimeout } from './constants';
import { actions as gameSessionActions } from '@/features/GameSession/reducer';

export default function ExposeControlNode(): null {
  const dispatch = useAppDispatch();
  const isPlaying = useGameSessionIsPlaying();
  const isFinished = useGameSessionIsFinished();
  const doPolling = isPlaying || isFinished;
  React.useEffect(() => {
    dispatch(getGameSessionQuestionIdxThunk()).then(
      (action: TGameSessionQuestionIdxPayloadAction) => {
        const { questionIdx } = action.payload;
        dispatch(gameSessionActions.setCurrentQuestionIdx(questionIdx));
      },
    );
  }, [dispatch]);
  React.useEffect(() => {
    if (doPolling) {
      // console.log('[GameSession/expose-control-node]: start game');
      const playingPolling = intervalPolling(async () => {
        // console.log('[GameSession/expose-control-node]: game iteration');
        return dispatch(gameSessionCheckThunk());
      }, gameSessionCheckPollingTimeout);
      playingPolling.polling();
      return () => {
        // console.log('[GameSession/expose-control-node]: stop game');
        playingPolling.close();
        // Reset game data
        dispatch(gameSessionActions.resetPlayingState());
      };
    }
  }, [dispatch, doPolling]);
  return null;
}
