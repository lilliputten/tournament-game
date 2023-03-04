/** @module useGameResultStatus
 *  @since 2023.03.04, 20:19
 *  @changed 2023.03.04, 22:15
 */

import React from 'react';

import {
  // TPartnersInfo,
  // useGameParamsGameMode,
  // useGameParamsToken,
  // useGameParamsUserName,
  // useGameQuestions,
  useGameSessionFinishedStatus,
  // useGameSessionFinishedTimestamp,
  useGameSessionGameMode,
  useGameSessionGameStatus,
  // useGameSessionGameToken,
  useGameSessionIsWinner,
  // useGameSessionPartnersInfo,
  // useGameSessionStartedTimestamp,
} from '@/core';

export interface TGameResultStatus {
  isSingle: boolean;
  isWinner: boolean | undefined;
  isFinished: boolean;
  isWaitingForOtherPlayer: boolean;
}

export function useGameResultStatus(): TGameResultStatus {
  // const questions = useGameQuestions();

  // const token = useGameParamsToken();
  // const userName = useGameParamsUserName();
  // const hasGameStarted = useGameWaitingIsGameStarted();
  // const gameToken = useGameSessionGameToken();
  const gameMode = useGameSessionGameMode();
  const gameStatus = useGameSessionGameStatus();

  // const partnersInfo: TPartnersInfo | undefined = useGameSessionPartnersInfo();

  const isWinner = useGameSessionIsWinner();
  const finishedStatus = useGameSessionFinishedStatus();
  // const finishedTimestamp = useGameSessionFinishedTimestamp();
  // const finishedTimestr = useGameSessionFinishedTimestr();
  // const startedTimestamp = useGameSessionStartedTimestamp();
  // const startedTimestr = useGameSessionStartedTimestr();

  /* console.log('[useGameResultStatus]: DEBUG', {
   *   gameMode,
   *   partnersInfo,
   *   gameStatus,
   *   isWinner,
   *   finishedStatus,
   *   finishedTimestamp,
   *   // finishedTimestr,
   *   startedTimestamp,
   *   // startedTimestr,
   *   questions,
   * });
   */

  const status: TGameResultStatus = React.useMemo(() => {
    const isSingle = gameMode === 'single';
    const isFinished = gameStatus === 'finished';
    const isWaitingForOtherPlayer = !isSingle && finishedStatus !== 'all';
    // const canBeWinner = !isSingle && !isWaitingForOtherPlayer;
    // TODO: Check for winner?
    // const isWinner = canBeWinner && true;
    const status: TGameResultStatus = {
      isSingle,
      isWinner,
      isFinished,
      isWaitingForOtherPlayer,
    };
    /* console.log('[useGameResultStatus]: DEBUG', {
     *   isSingle,
     *   isWinner,
     *   gameMode,
     *   gameStatus,
     *   // partnersInfo,
     *   finishedStatus,
     *   // finishedTimestamp,
     *   // // finishedTimestr,
     *   // startedTimestamp,
     *   // // startedTimestr,
     *   // questions,
     * });
     */
    return status;
  }, [finishedStatus, gameMode, gameStatus, isWinner]);

  return status;
}
