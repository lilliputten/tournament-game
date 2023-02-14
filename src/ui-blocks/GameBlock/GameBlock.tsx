/** @module GameBlock
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.14, 17:34
 */

import React from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

// import config from '@/config';
// import { TRootState } from '@/core/app/app-root-state';
import {
  cancelAllActiveRequests,
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameSessionPartnerName,
  useGameSessionIsLoading,
  useGameSessionPartnerToken,
  useGameSessionGameToken,
  useGameWaitingIsStarted,
  useGameSessionIsPlaying,
} from '@/core';
import { gameSessionStartThunk } from '@/features/GameSession/services';
import {
  Empty,
  GameInfo,
  // ...
} from './GameBlockContent';

import styles from './GameBlock.module.scss';

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

  const isStarted = useGameWaitingIsStarted();

  const isLoading = useGameSessionIsLoading();
  const isPlaying = useGameSessionIsPlaying();

  const partnerName = useGameSessionPartnerName();
  const partnerToken = useGameSessionPartnerToken();
  const gameToken = useGameSessionGameToken();

  const isParamsReady = !!(token && userName && isStarted);
  const isGameReady = !!(isParamsReady && gameToken && (gameMode !== 'multi' || partnerToken));

  console.log('[GameBlock]: DEBUG', {
    isParamsReady,
    isGameReady,
    token,
    userName,
    gameMode,
    isLoading,
    isPlaying,
    partnerName,
    partnerToken,
    gameToken,
  });

  // Effect: Start game...
  React.useEffect(() => {
    if (isParamsReady && !isGameReady /* && gameMode === 'multi' */) {
      console.log('[GameBlock]: Effect: Start game', { isParamsReady, isGameReady });
      dispatch(gameSessionStartThunk());
      // TODO: Handler on game end?
    }
  }, [isParamsReady, isGameReady, dispatch]);

  // Effect: Params not ready?
  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (!isParamsReady) {
      console.log('[GameBlock]: Effect: Params not ready -> go to waiting');
      router.push('/waiting');
    }
  }, [router, isParamsReady]);

  const content = React.useMemo(() => {
    if (!isGameReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return <Empty reason="Not ready" />;
    } else if (isPlaying) {
      // return <Empty reason="Playing" />;
      return <GameInfo partnerName={partnerName} gameMode={gameMode} />;
    } else if (isStarted) {
      // All is ok: start game (TODO)...
      return <GameInfo partnerName={partnerName} gameMode={gameMode} />;
    }
  }, [
    isStarted,
    partnerName,
    gameMode,
    isGameReady,
    isPlaying,
    // isLoading,
    // cancelWaiting,
  ]);

  return (
    <Box className={classnames(className, styles.container)} my={2}>
      {content}
    </Box>
  );
}
