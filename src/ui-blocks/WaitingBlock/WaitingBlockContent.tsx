import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import classnames from 'classnames';

import { TGameSessionState } from '@/features/GameSession';

import styles from './WaitingBlock.module.scss';

export interface TWaitingBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)} />
  );
}

export function WaitingStart({
  cancelWaiting,
  isWaiting,
}: {
  cancelWaiting?: TCb;
  isWaiting: boolean;
}) {
  return (
    <Box className={classnames(styles.container, styles.WaitingStart)}>
      <Typography variant="h5" gutterBottom>
        Старт игры
      </Typography>
      <Stack className={styles.actions} spacing={2} direction="row">
        {isWaiting && !!cancelWaiting && (
          <Button className="FixMuiButton" onClick={cancelWaiting} variant="contained">
            <span className="Text">Отменить</span>
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export function WaitingMulti({
  cancelWaiting,
  isWaiting,
}: {
  cancelWaiting?: TCb;
  isWaiting: boolean;
}) {
  return (
    <Box className={classnames(styles.container, styles.WaitingMulti)}>
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
    </Box>
  );
}

export function WaitingSingle({
  cancelWaiting,
  isWaiting,
}: {
  cancelWaiting?: TCb;
  isWaiting: boolean;
}) {
  return (
    <Box className={classnames(styles.container, styles.WaitingSingle)}>
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
    </Box>
  );
}

export function WaitingFailed({
  onSingleClick,
  goToStartPage,
}: {
  onSingleClick?: TCb;
  goToStartPage?: TCb;
}) {
  return (
    <Box className={classnames(styles.container, styles.WaitingFailed)}>
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
    </Box>
  );
}

export function WasCancelled({ goToStartPage }: { goToStartPage?: TCb }) {
  return (
    <Box className={classnames(styles.container, styles.WasCancelled)}>
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
    </Box>
  );
}

export function GameReady({ partnerName }: Pick<TGameSessionState, 'partnerName'>) {
  return (
    <Box className={classnames(styles.container, styles.GameReady)}>
      <Typography variant="h5" gutterBottom>
        Игра готова
      </Typography>
      {partnerName && (
        <Typography variant="body1" gutterBottom>
          Ваш партнёр: {partnerName}
        </Typography>
      )}
      <Typography variant="body1" gutterBottom>
        Игра запускается...
      </Typography>
    </Box>
  );
}
