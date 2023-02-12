import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Stack } from '@mui/system';

import styles from './WaitingBlock.module.scss';

export interface TWaitingBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function WaitingStart({
  cancelWaiting,
  isWaiting,
}: {
  cancelWaiting?: TCb;
  isWaiting: boolean;
}) {
  return (
    <>
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
    </>
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

export function WaitingSingle({
  cancelWaiting,
  isWaiting,
}: {
  cancelWaiting?: TCb;
  isWaiting: boolean;
}) {
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

export function WaitingFailed({
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

export function WasCancelled({ goToStartPage }: { goToStartPage?: TCb }) {
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

export function GameReady() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Игра готова
      </Typography>
    </>
  );
}
