/** @module WaitingBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.11, 17:54
 */

import React from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import config from '@/config';
import { TRootState } from '@/core/app/app-root-state';
import {
  cancelAllActiveRequests,
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsToken,
  useGameParamsUserName,
  useGameSessionIsFailed,
  useGameSessionIsLoading,
  useGameSessionIsStarted,
  useGameSessionIsWaiting,
} from '@/core';
import { actions as gameParamsActions } from '@/features/GameParams/reducer';
import { Stack } from '@mui/system';
import { fetchStartWaitingAction } from '@/features/GameSession/services';

import styles from './WaitingBlock.module.scss';

export interface TWaitingBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

type TCb = () => void;

function WaitingMulti({ cancelWaiting, isWaiting }: { cancelWaiting?: TCb; isWaiting: boolean }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Ищем соперника
      </Typography>
      <Typography variant="body1" gutterBottom>
        Это может занять несколько минут.
      </Typography>
      <Stack className={styles.actions} spacing={2} direction="row">
        {isWaiting && !!cancelWaiting && (
          <Button className="FixMuiButton" onClick={cancelWaiting} variant="contained">
            <span className="Text">Отменить</span>
          </Button>
        )}
      </Stack>
    </>
  );
}

function WaitingSingle({ cancelWaiting, isWaiting }: { cancelWaiting?: TCb; isWaiting: boolean }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Запуск игры
      </Typography>
      <Stack className={styles.actions} spacing={2} direction="row">
        {isWaiting && !!cancelWaiting && (
          <Button className="FixMuiButton" onClick={cancelWaiting} variant="contained">
            <span className="Text">Отменить</span>
          </Button>
        )}
      </Stack>
    </>
  );
}

function WaitingFailed({
  onSingleClick,
  goToStartPage,
}: {
  onSingleClick?: TCb;
  goToStartPage?: TCb;
}) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Похоже, сейчас нет подходщих соперников
      </Typography>
      <Typography variant="body1" gutterBottom>
        Вы можете сыграть самостоятельно и подняться в рейтинге
      </Typography>
      <Stack className={styles.actions} spacing={2} direction="row">
        {!!onSingleClick && (
          <Button className="FixMuiButton" onClick={onSingleClick} variant="contained">
            <span className="Text">Турнир для одного</span>
          </Button>
        )}
        {!!goToStartPage && (
          <Button className="FixMuiButton" onClick={goToStartPage}>
            <span className="Text">Начать сначала</span>
          </Button>
        )}
      </Stack>
    </>
  );
}

function WasCancelled({ goToStartPage }: { goToStartPage?: TCb }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Старт игры был отменён
      </Typography>
      <Stack className={styles.actions} spacing={2} direction="row">
        {!!goToStartPage && (
          <Button className="FixMuiButton" onClick={goToStartPage} variant="contained">
            <span className="Text">Начать сначала</span>
          </Button>
        )}
      </Stack>
    </>
  );
}

function GameReady() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Игра готова
      </Typography>
    </>
  );
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
  const isLoading = useGameSessionIsLoading();
  const isWaiting = useGameSessionIsWaiting();
  const isStarted = useGameSessionIsStarted();
  const isFailed = useGameSessionIsFailed();

  // const isLoading = true;
  // const isFailed = false;

  const isReady = !!userName && !!token;

  const goToStartPage = React.useCallback(() => {
    router.push('/');
  }, [router]);

  // DEBUG: fetchWaiting
  React.useEffect(() => {
    // console.log('[WaitingBlock]: DEBUG: fetchWaiting', { token, userName, gameMode });
    if (isReady && token && userName /* && gameMode === 'multi' */) {
      fetchStartWaitingAction(appRootStore); // DEBUG
    }
  }, [token, isReady, userName, appRootStore]);

  React.useEffect(() => {
    // Go to the start page if environment isn't ready yet
    if (!isReady && !config.build.isDev) {
      goToStartPage();
    }
  }, [goToStartPage, isReady, isLoading, token, userName, gameMode]);

  const handlePlaySingle = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('single'));
    // TODO: Clear isFailed
  }, [dispatch]);

  const [wasCancelled, setCancelled] = React.useState(false);

  const cancelWaiting = React.useCallback(() => {
    cancelAllActiveRequests();
    setCancelled(true);
  }, []);

  const content = React.useMemo(() => {
    if (!isReady) {
      // Don't render nothing and go to the start page if environment isn't ready yet...
      return null;
    } else if (isStarted) {
      // All is ok: start game (TODO)...
      return <GameReady />;
    } else if (isFailed) {
      // All is ok but server returned 'partner not found' status...
      return <WaitingFailed onSingleClick={handlePlaySingle} goToStartPage={goToStartPage} />;
    } else if (wasCancelled) {
      return <WasCancelled goToStartPage={goToStartPage} />;
    } else if (!isWaiting) {
      // ???
      return null;
    } else if (gameMode === 'multi') {
      // Waiting for multi player game...
      return <WaitingMulti cancelWaiting={cancelWaiting} isWaiting={isWaiting} />;
    } else {
      // Waiting for single player game (no waiting required?)...
      return <WaitingSingle cancelWaiting={cancelWaiting} isWaiting={isWaiting} />;
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
    wasCancelled,
  ]);

  return (
    <Box className={classnames(className, styles.container)} my={2}>
      {content}
    </Box>
  );
}
