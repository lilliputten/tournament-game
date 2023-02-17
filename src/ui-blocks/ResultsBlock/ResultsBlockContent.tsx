import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import classnames from 'classnames';

import config from '@/config';

import styles from './ResultsBlockContent.module.scss';

export interface TResultsBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)}>
      {config.build.isDev && reason && <Typography>WatingBlock Empty: {reason}</Typography>}
    </Box>
  );
}

export function SuccessBlock({ onClick, goToStartPage }: { onClick?: TCb; goToStartPage?: TCb }) {
  return (
    <Box className={classnames(styles.container, styles.WaitingFailed)}>
      <Typography variant="h5">Игра завершена!</Typography>
      {/*
      <Typography variant="h5">Ура! Вы победили в этой игре</Typography>
      <Typography>Ваш результат 4 правильных ответа из 10 за 1:45 секунд</Typography>
      */}
      <Stack className={styles.actions} spacing={2} direction="row" justifyContent="center">
        {!!goToStartPage && (
          <Button className="FixMuiButton" onClick={goToStartPage} variant="contained">
            <span className="Text">Сыграть ещё раз</span>
          </Button>
        )}
        <Button className="FixMuiButton" onClick={onClick} disabled>
          <span className="Text">Посмотреть турнирную таблицу</span>
        </Button>
      </Stack>
    </Box>
  );
}
