/** @module GameBlock
 *  @desc This component can manage different game screens (main game screen is GamePlaying).
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.15, 16:56
 */

import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

import { loadQuestionsThunk } from '@/features/Questions/services';
import {
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  // useGameSessionPartnerName,
  useGameSessionPartnerToken,
  useGameSessionGameToken,
  useGameWaitingIsGameStarted,
  useGameSessionIsPlaying,
  useQuestions,
} from '@/core';
import { gameSessionStartThunk } from '@/features/GameSession/services';
import {
  Empty,
  // GameInfo,
} from './GameBlockContent';

import styles from './GameBlock.module.scss';
import { GamePlaying } from '@/components/Game/GamePlaying';

export interface TGameBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function GameBlock(props: TGameBlockProps): JSX.Element | null {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */

  // const appRootStore = useStore<TRootState>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();

  // Has game started in GameWaiting?
  const hasGameStarted = useGameWaitingIsGameStarted();

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

  // Effect: Questions...
  React.useEffect(() => {
    if (isParamsReady) {
      dispatch(loadQuestionsThunk());
    }
  }, [isParamsReady, dispatch]);

  // Effect: Start game...
  React.useEffect(() => {
    if (isParamsReady && !isGameReady) {
      debugger;
      dispatch(gameSessionStartThunk());
      // TODO: To use handler on game end?
    }
  }, [isParamsReady, isGameReady, dispatch]);

  // Effect: Params not ready?
  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (!isParamsReady) {
      router.push('/waiting');
    }
  }, [router, isParamsReady]);

  const content = React.useMemo(() => {
    if (!isGameReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return <Empty reason="Not ready" />;
    } else if (isPlaying) {
      return <GamePlaying />;
      // return <GameInfo partnerName={partnerName} gameMode={gameMode} />;
    } else {
      return <Empty reason="Unknown" />;
    }
  }, [
    // partnerName,
    // gameMode,
    isGameReady,
    isPlaying,
  ]);

  return (
    <Box className={classnames(className, styles.container)} my={2} flexDirection="row">
      {content}
    </Box>
  );
}
