/** @module StartBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.10, 21:53
 */

import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import { UserNameDialog } from '@/ui-blocks/UserNameDialog';

import {
  // useRootStore,
  // useGameParamsToken,
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsIsLoading,
  useGameParamsUserName,
} from '@/core';
import { actions as gameParamsActions } from '@/features/GameParams/reducer';
import { TWithGameParamsWrapperProps } from '../withGameParamsWrapper/withGameParamsWrapper';

import styles from './StartBlock.module.scss';
// import { postSetNameAction } from '@/features/GameParams/services';

export interface TStartBlockProps extends TWithGameParamsWrapperProps {
  className?: string;
}

export function StartBlock(props: TStartBlockProps): JSX.Element {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */

  const dispatch = useAppDispatch();
  // const appRootStore = useRootStore();
  const router = useRouter();

  const isLoading = useGameParamsIsLoading();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();

  const [isUserNameDialogOpened, openUserNameDialog] = React.useState(false);

  const closeNameDialog = React.useCallback(() => {
    openUserNameDialog(false);
  }, []);

  const handleUserName = React.useCallback(
    (name: string) => {
      closeNameDialog();
      dispatch(gameParamsActions.setUserName(name));
      // XXX: Save name here?
      // postSetNameAction(appRootStore, { name });
      // TODO: Start waiting for a game partner...
      console.log('[StartBlock:handleUserName] (Start waiting for a game partner)', {
        name,
        gameMode,
      });
      // Go to the waiting page...
      router.push('/waiting'); // DEBUG
    },
    [dispatch, router, closeNameDialog, gameMode],
  );

  const chooseSinglePlayer = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('single'));
    openUserNameDialog(true);
  }, [dispatch]);

  const chooseMultiPlayer = React.useCallback(() => {
    dispatch(gameParamsActions.setGameMode('multi'));
    openUserNameDialog(true);
  }, [dispatch]);

  return (
    <Box className={classnames(className, styles.container)}>
      <Typography variant="h5" gutterBottom className={classnames(styles.title)}>
        Турнир по теме «Что проверить в договорах»
      </Typography>
      <Typography variant="body1" gutterBottom className={classnames(styles.question)}>
        Как вы хотите сыграть?
      </Typography>
      {!isLoading && (
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
      )}
      <UserNameDialog
        name={userName || ''}
        open={isUserNameDialogOpened}
        onClose={closeNameDialog}
        onSubmit={handleUserName}
      />
    </Box>
  );
}
