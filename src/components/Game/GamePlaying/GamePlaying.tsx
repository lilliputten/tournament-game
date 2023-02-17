/** @module GamePlaying
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.15, 21:30
 */

import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

import {
  // useAppDispatch,
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameSessionPartnerToken,
  useGameSessionGameToken,
  useGameWaitingIsGameStarted,
  useGameSessionIsPlaying,
  useQuestions,
} from '@/core';
import { Empty } from './GamePlayingContent';

import styles from './GamePlaying.module.scss';
import { GameLayout } from '../GameLayout/GameLayout';

export interface TGamePlayingProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function GamePlaying(props: TGamePlayingProps): JSX.Element | null {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */

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

  const questions = useQuestions();
  const hasQuestions = !!questions;

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
