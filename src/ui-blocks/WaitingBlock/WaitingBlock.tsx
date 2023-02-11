/** @module WaitingBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.11, 15:34
 */

import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import {
  useAppDispatch,
  useGameParamsGameMode,
  // useGameParamsLoading,
  useGameParamsToken,
  useGameParamsUserName,
} from '@/core';
import { setGameMode } from '@/features/GameParams/reducer';
import { Stack } from '@mui/system';
import { LoaderSplash } from '@/ui-elements';

import styles from './WaitingBlock.module.scss';

export interface TWaitingBlockProps {
  className?: string;
}

type TCb = () => void;

function WaitingMulti({ cancelWaiting }: { cancelWaiting?: TCb }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Ищем соперника
      </Typography>
      <Typography variant="body1" gutterBottom>
        Это может занять несколько минут.
      </Typography>
      <LoaderSplash
        className={styles.smallLoader}
        spinnerSize="medium"
        show // Without animations!
      />
      <Stack className={styles.actions} spacing={2} direction="row">
        {!!cancelWaiting && (
          <Button className="FixMuiButton" onClick={cancelWaiting} variant="contained">
            <span className="Text">Отменить</span>
          </Button>
        )}
      </Stack>
    </>
  );
}

function WaitingSingle({ cancelWaiting }: { cancelWaiting?: TCb }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Запуск игры
      </Typography>
      <LoaderSplash
        className={styles.smallLoader}
        spinnerSize="medium"
        show // Without animations!
      />
      <Stack className={styles.actions} spacing={2} direction="row">
        {!!cancelWaiting && (
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
            <span className="Text">Перейти на стартовую страницу</span>
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

  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();
  const isLoading = true;
  const isFailed = false;

  const isReady = !!userName && !!token;

  const goToStartPage = React.useCallback(() => {
    router.push('/');
  }, [router]);

  React.useEffect(() => {
    // console.log('[WaitingBlock:Effect: Check environment status]', { isLoading, token, userName, gameMode });
    // // Go to the start page if environment isn't ready yet
    if (!isReady) {
      goToStartPage();
    }
  }, [goToStartPage, isReady, isLoading, token, userName, gameMode]);

  const handlePlaySingle = React.useCallback(() => {
    dispatch(setGameMode('single'));
    // TODO: Clear isFailed
  }, [dispatch]);

  const cancelWaiting = React.useCallback(() => {
    // TODO: Cancel waiting
    goToStartPage();
  }, [goToStartPage]);

  const content = React.useMemo(() => {
    if (!isReady) {
      return null;
    } else if (isFailed) {
      return <WaitingFailed onSingleClick={handlePlaySingle} goToStartPage={goToStartPage} />;
    } else if (!isLoading) {
      return <GameReady />;
    } else if (gameMode === 'multi') {
      return <WaitingMulti cancelWaiting={cancelWaiting} />;
    } else {
      return <WaitingSingle cancelWaiting={cancelWaiting} />;
    }
  }, [isReady, isFailed, isLoading, gameMode, goToStartPage, cancelWaiting, handlePlaySingle]);

  // Don't render nothing and go to the start page if environment isn't ready yet
  if (!isReady) {
    // goToStartPage();
    return null;
  }

  return (
    <Box className={classnames(className, styles.container)}>
      {/* Pre-rendered content */}
      {content}
    </Box>
  );
}
