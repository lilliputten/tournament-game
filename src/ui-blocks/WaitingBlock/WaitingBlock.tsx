/** @module WaitingBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.13, 19:34
 */

import React from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames';

import config from '@/config';
import { TRootState } from '@/core/app/app-root-state';
import {
  cancelAllActiveRequests,
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameWaitingIsFailed,
  useGameWaitingIsLoading,
  useGameWaitingIsGameStarted,
  useGameWaitingIsWaiting,
  useGameWaitingIsWaitingCycle,
  useGameWaitingPartnerName,
} from '@/core';
import { actions as gameParamsActions } from '@/features/GameParams/reducer';
import { actions as gameWaitingActions } from '@/features/GameWaiting/reducer';
import { fetchStartWaitingAction, sendStopWaitingThunk } from '@/features/GameWaiting/services';
import {
  Empty,
  WaitingMulti,
  WaitingSingle,
  WaitingFailed,
  WasCancelled,
  GameReady,
  WaitingStart,
} from './WaitingBlockContent';

import styles from './WaitingBlock.module.scss';

const startGameDelaySec = 3;

export interface TWaitingBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function WaitingBlock(props: TWaitingBlockProps): JSX.Element | null {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */

  const appRootStore = useStore<TRootState>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();
  const isLoading = useGameWaitingIsLoading();
  const isWaiting = useGameWaitingIsWaiting();
  const isWaitingCycle = useGameWaitingIsWaitingCycle();
  const isStarted = useGameWaitingIsGameStarted();
  const isFailed = useGameWaitingIsFailed();

  // TODO: To use partnerName from waiting state!
  const partnerName = useGameWaitingPartnerName();

  const isReady = !!userName && !!token;

  const goToStartPage = React.useCallback(() => {
    router.push('/');
  }, [router]);

  const goToGamePage = React.useCallback(() => {
    router.push('/game');
  }, [router]);

  // Effect: Start game...
  React.useEffect(() => {
    if (isReady && isStarted) {
      const isMultiGame = gameMode === 'multi';
      if (isMultiGame) {
        // Go to game page after delay...
        setTimeout(goToGamePage, startGameDelaySec * 1000);
      } else {
        // Go to game page immmediately...
        goToGamePage();
      }
    }
  }, [goToGamePage, isReady, isStarted, gameMode]);

  // Effect: Start waiting...
  React.useEffect(() => {
    if (isReady /* && gameMode === 'multi' */) {
      fetchStartWaitingAction(appRootStore);
    }
  }, [isReady, appRootStore]);

  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (
      !isReady &&
      // DEBUG: Do not redirect in dev mode & userName has set
      !config.build.isDev &&
      !localStorage.getItem('gameParams:userName')
    ) {
      goToStartPage();
    }
  }, [goToStartPage, isReady, isLoading, token, userName, gameMode]);

  const handlePlaySingle = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('single'));
    // TODO: Clear isFailed
  }, [dispatch]);

  const [wasCancelled, setCancelled] = React.useState(false);

  const cancelWaiting = React.useCallback(() => {
    // console.log('[WaitingBlock]: cancelWaiting');
    cancelAllActiveRequests();
    dispatch(sendStopWaitingThunk());
    dispatch(gameWaitingActions.resetData());
    setCancelled(true);
  }, [dispatch]);

  const content = React.useMemo(() => {
    if (!isReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return <Empty reason="Not ready" />;
    } else if (isStarted) {
      // All is ok: start game (redirect should be executed, see Effect: Start game)...
      // return <Empty reason="Ready" />;
      return (
        <GameReady
          partnerName={partnerName}
          gameMode={gameMode}
          // NOTE: It's silly to display unchaning delay value.
          // startGameDelaySec={startGameDelaySec}
        />
      );
    } else if (isFailed) {
      // All is ok but server returned 'partner not found' status...
      return <WaitingFailed onSingleClick={handlePlaySingle} goToStartPage={goToStartPage} />;
    } else if (wasCancelled) {
      return <WasCancelled goToStartPage={goToStartPage} />;
    } else if (!isWaiting) {
      // ???
      return <Empty reason="Not waiting" />;
    } else if (!isWaitingCycle) {
      return <WaitingStart cancelWaiting={cancelWaiting} isWaiting />;
    } else if (gameMode === 'single') {
      // Waiting for single player game (no waiting required?)...
      return <WaitingSingle cancelWaiting={cancelWaiting} isWaiting />;
    } else {
      // Waiting for multi player game...
      return <WaitingMulti cancelWaiting={cancelWaiting} isWaiting />;
    }
  }, [
    cancelWaiting,
    gameMode,
    goToStartPage,
    handlePlaySingle,
    isFailed,
    isReady,
    isStarted,
    isWaiting,
    isWaitingCycle,
    partnerName,
    wasCancelled,
  ]);

  return (
    <Box className={classnames(className, styles.container)} my={2}>
      {content}
    </Box>
  );
}
