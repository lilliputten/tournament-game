import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Stack } from '@mui/system';
import classnames from 'classnames';

import config from '@/config';
import { TGameSessionState } from '@/features/GameSession';

import styles from './GameBlockContent.module.scss';
import { TGameParamsState } from '@/features/GameParams';

export interface TGameBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)}>
      {config.build.isDev && reason && <Typography>GameBlock Empty: {reason}</Typography>}
    </Box>
  );
}

export function GameInfo({
  partnerName,
  gameMode,
}: Pick<TGameSessionState, 'partnerName'> & Pick<TGameParamsState, 'gameMode'>) {
  return (
    <Box className={classnames(styles.container, styles.GameReady)}>
      <Typography variant="h5">Информция об игре (GameBlock)</Typography>
      {gameMode && <Typography>Режим игры: {gameMode}</Typography>}
      {partnerName && <Typography>Ваш партнёр: {partnerName}</Typography>}
      {/*
      <Typography>
        Игра запускается...
      </Typography>
      */}
    </Box>
  );
}
