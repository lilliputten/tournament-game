/** @module ResultsBlock
 *  @since 2023.02.17, 05:07
 *  @changed 2023.03.04, 22:21
 */

import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

import {
  TPartnersInfo,
  // useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameQuestions,
  // useGameSessionFinishedStatus,
  useGameSessionFinishedTimestamp,
  useGameSessionGameToken,
  useGameSessionPartnersInfo,
  useGameSessionStartedTimestamp,
} from '@/core';
import { Empty, GameInfo } from './ResultsBlockContent';

import styles from './ResultsBlock.module.scss';
import { useGameResultStatus } from '@/core/hooks/useGameResultStatus';

export interface TResultsBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function ResultsBlock(props: TResultsBlockProps): JSX.Element | null {
  const { className } = props;

  // const dispatch = useAppDispatch();
  const router = useRouter();

  const questions = useGameQuestions();

  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  // const hasGameStarted = useGameWaitingIsGameStarted();
  const gameToken = useGameSessionGameToken();
  // const gameMode = useGameParamsGameMode();

  const partnersInfo: TPartnersInfo | undefined = useGameSessionPartnersInfo();

  // const finishedStatus = useGameSessionFinishedStatus();
  const finishedTimestamp = useGameSessionFinishedTimestamp();
  // const finishedTimestr = useGameSessionFinishedTimestr();
  const startedTimestamp = useGameSessionStartedTimestamp();
  // const startedTimestr = useGameSessionStartedTimestr();

  const resultsStatus = useGameResultStatus();
  const { isSingle, isWinner, isFinished, isWaitingForOtherPlayer } = resultsStatus;

  /* console.log('[ResultsBlock]: DEBUG', {
   *   isSingle,
   *   isWinner,
   *   isFinished,
   *   isWaitingForOtherPlayer,
   *   gameMode,
   *   partnersInfo,
   *   finishedStatus,
   *   finishedTimestamp,
   *   // finishedTimestr,
   *   startedTimestamp,
   *   // startedTimestr,
   *   questions,
   * });
   */

  // const isParamsReady = !!(token && userName && hasGameStarted);
  const isReady = !!(userName && token && gameToken);

  const goToStartPage = React.useCallback(() => {
    router.push('/');
  }, [router]);

  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (!isReady /* && !config.build.isDev */) {
      goToStartPage();
    }
  }, [goToStartPage, isReady]);

  const showTable = React.useCallback(() => {
    // dispatch(gameParamsActions.setGameMode('single'));
  }, []);

  const content = React.useMemo(() => {
    if (!isReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return <Empty reason="Not ready" />;
    }
    return (
      <GameInfo
        onClick={showTable}
        goToStartPage={goToStartPage}
        finishedTimestamp={finishedTimestamp}
        startedTimestamp={startedTimestamp}
        partnersInfo={partnersInfo}
        token={token}
        questions={questions}
        isSingle={isSingle}
        isWinner={isWinner}
        isFinished={isFinished}
        isWaitingForOtherPlayer={isWaitingForOtherPlayer}
      />
    );
  }, [
    isReady,
    showTable,
    goToStartPage,
    finishedTimestamp,
    startedTimestamp,
    partnersInfo,
    token,
    questions,
    isSingle,
    isWinner,
    isFinished,
    isWaitingForOtherPlayer,
  ]);

  return (
    <Box className={classnames(className, styles.container)} my={2}>
      {content}
    </Box>
  );
}
