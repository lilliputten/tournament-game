/** @module GamePlaying
 *  @since 2023.02.14, 14:52
 *  @changed 2023.03.04, 19:46
 */

import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

import {
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameSessionPartnerToken,
  useGameSessionGameToken,
  useGameWaitingIsGameStarted,
  useGameSessionIsPlaying,
  useGameQuestions,
} from '@/core';
import { Empty } from './GamePlayingContent';
import { GameLayout } from '../GameLayout/GameLayout';

import styles from './GamePlaying.module.scss';

export interface TGamePlayingProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function GamePlaying(props: TGamePlayingProps): JSX.Element | null {
  const { className } = props;

  // const appRootStore = useStore<TRootState>();
  // const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();

  // Has game started in GameWaiting?
  const hasGameStarted = useGameWaitingIsGameStarted();

  // const isStarted = useGameWaitingIsGameStarted();

  const isPlaying = useGameSessionIsPlaying();

  // const partnerName = useGameSessionPartnerName();
  const partnerToken = useGameSessionPartnerToken();
  const gameToken = useGameSessionGameToken();

  const questions = useGameQuestions();
  const hasQuestions = !!(questions && questions.length);

  const isParamsReady = !!(token && userName && hasGameStarted);
  const isGameReady = !!(
    isParamsReady &&
    gameToken &&
    hasQuestions &&
    (gameMode !== 'multi' || partnerToken)
  );

  // Effect: Game not ready?
  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (!isGameReady) {
      router.push('/waiting');
    }
  }, [router, isGameReady]);

  const content = React.useMemo(() => {
    if (!isGameReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return <Empty reason="Not ready" />;
    } else if (isPlaying) {
      return <GameLayout />;
    } else {
      return <Empty reason="Unknown" />;
    }
  }, [isGameReady, isPlaying]);

  return <Box className={classnames(className, styles.container)}>{content}</Box>;
}
