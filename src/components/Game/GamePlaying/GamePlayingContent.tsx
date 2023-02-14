import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Stack } from '@mui/system';
import classnames from 'classnames';

import config from '@/config';
import { TGameSessionState } from '@/features/GameSession';

import styles from './GamePlayingContent.module.scss';

export interface TGamePlayingProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)}>
      {config.build.isDev && reason && (
        <Typography variant="body1" gutterBottom>
          GamePlaying Empty: {reason}
        </Typography>
      )}
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
