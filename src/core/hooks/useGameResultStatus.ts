/** @module useGameResultStatus
 *  @since 2023.03.04, 20:19
 *  @changed 2023.03.05, 04:54
 */

import React from 'react';

import {
  useGameSessionFinishedStatus,
  useGameSessionGameMode,
  useGameSessionGameStatus,
  useGameSessionIsWinner,
} from '@/core';

export interface TGameResultStatus {
  isSingle: boolean;
  isWinner: boolean | undefined;
  isFinished: boolean;
  isWaitingForOtherPlayer: boolean;
}

export function useGameResultStatus(): TGameResultStatus {
  const gameMode = useGameSessionGameMode();
  const gameStatus = useGameSessionGameStatus();

  const isWinner = useGameSessionIsWinner();
  const finishedStatus = useGameSessionFinishedStatus();

  const status: TGameResultStatus = React.useMemo(() => {
    const isSingle = gameMode === 'single';
    const isFinished = gameStatus === 'finished';
    const isWaitingForOtherPlayer = !isSingle && finishedStatus !== 'all';
    const canBeWinner = !isSingle && !isWaitingForOtherPlayer;
    const status: TGameResultStatus = {
      isSingle,
      isWinner: canBeWinner ? isWinner : undefined,
      isFinished,
      isWaitingForOtherPlayer,
    };
    return status;
  }, [finishedStatus, gameMode, gameStatus, isWinner]);

  return status;
}
