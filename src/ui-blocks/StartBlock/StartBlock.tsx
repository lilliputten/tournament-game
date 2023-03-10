/** @module StartBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.03.04, 15:51
 */

import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Stack, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import { UserNameDialog } from '@/ui-blocks/UserNameDialog';

import {
  // useRootStore,
  // useGameParamsToken,
  useAppDispatch,
  useGameParamsHasStarted,
  // useGameParamsGameMode,
  useGameParamsIsLoading,
  useGameParamsToken,
  useGameParamsUserName,
} from '@/core';
import { actions as gameParamsActions } from '@/features/GameParams/reducer';
import { TWithGameParamsWrapperProps } from '../withGameParamsWrapper/withGameParamsWrapper';

import CupSvg from './assets/cup.svg';

import styles from './StartBlock.module.scss';

export interface TStartBlockProps extends TWithGameParamsWrapperProps {
  className?: string;
}

export function StartBlock(props: TStartBlockProps) {
  const { className } = props;

  const dispatch = useAppDispatch();
  // const appRootStore = useRootStore();
  const router = useRouter();

  const isLoading = useGameParamsIsLoading();
  const hasStarted = useGameParamsHasStarted();
  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  // const gameMode = useGameParamsGameMode();

  const [isUserNameDialogOpened, openUserNameDialog] = React.useState(false);

  const closeNameDialog = React.useCallback(() => {
    openUserNameDialog(false);
  }, []);

  const handleUserName = React.useCallback(
    (name: string) => {
      closeNameDialog();
      dispatch(gameParamsActions.setUserName(name));
      // XXX: To save name to server here?
      // postSetNameAction(appRootStore, { name });
      // Go to the waiting page...
      router.push('/waiting'); // DEBUG
    },
    [dispatch, router, closeNameDialog],
  );

  const chooseSinglePlayer = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('single'));
    openUserNameDialog(true);
  }, [dispatch]);

  const chooseMultiPlayer = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('multi'));
    openUserNameDialog(true);
  }, [dispatch]);

  if (!token) {
    return null;
  }

  return (
    <Box className={classnames(className, styles.container)}>
      <Stack className={classnames(styles.content)}>
        <Typography variant="h5" className={classnames(styles.title)} gutterBottom>
          Турнир по теме «Изменения в работе»
        </Typography>
        {!isLoading && hasStarted && token && (
          <>
            <Typography className={classnames(styles.question)} gutterBottom>
              Как вы хотите сыграть?
            </Typography>
            <ButtonGroup
              className={classnames(styles.actions)}
              variant="outlined"
              aria-label="outlined primary button group"
            >
              <Button className="FixMuiButton" onClick={chooseSinglePlayer}>
                <span className="Text">Турнир для одного</span>
              </Button>
              <Button className="FixMuiButton" onClick={chooseMultiPlayer}>
                <span className="Text">Турнир для двоих</span>
              </Button>
            </ButtonGroup>
          </>
        )}
        <UserNameDialog
          name={userName || ''}
          open={isUserNameDialogOpened}
          onClose={closeNameDialog}
          onSubmit={handleUserName}
        />
      </Stack>
      <Stack className={classnames(styles.visual)}>
        <CupSvg />
      </Stack>
    </Box>
  );
}
