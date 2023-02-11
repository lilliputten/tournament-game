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
  useAppDispatch,
  useGameParamsGameMode,
  useGameParamsLoading,
  useGameParamsToken,
  useGameParamsUserName,
} from '@/core';
import { setGameMode, setUserName } from '@/features/GameParams/reducer';
import { TWithGameParamsWrapperProps } from '../withGameParamsWrapper/withGameParamsWrapper';

import styles from './StartBlock.module.scss';

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
  const router = useRouter();

  const isLoading = useGameParamsLoading();
  const token = useGameParamsToken();
  const userName = useGameParamsUserName();
  const gameMode = useGameParamsGameMode();

  const [isUserNameDialogOpened, openUserNameDialog] = React.useState(false);

  /* // DEBUG
   * React.useEffect(() => {
   *   console.log('[StartBlock:DEBUG]', { isLoading, token, userName, gameMode });
   * }, [isLoading, token, userName, gameMode]);
   */

  const closeNameDialog = React.useCallback(() => {
    openUserNameDialog(false);
  }, []);

  const handleUserName = React.useCallback(
    (name: string) => {
      closeNameDialog();
      dispatch(setUserName(name));
      // TODO: Start wainting for a game partner...
      console.log('[StartBlock:handleUserName] (Start wainting for a game partner)', {
        name,
        gameMode,
        token,
      });
      // Go to the waiting page...
      router.push('/waiting');
    },
    [dispatch, router, closeNameDialog, gameMode, token],
  );

  const chooseSinglePlayer = React.useCallback(() => {
    dispatch(setGameMode('single'));
    openUserNameDialog(true);
  }, [dispatch]);

  const chooseMultiPlayer = React.useCallback(() => {
    dispatch(setGameMode('multi'));
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