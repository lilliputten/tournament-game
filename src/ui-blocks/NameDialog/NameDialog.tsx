/** @module NameDialog
 *  @since 2023.02.10, 15:33
 *  @changed 2023.02.10, 17:33
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';

import classnames from 'classnames';

import styles from './NameDialog.module.scss';

export interface TNameDialogProps {
  className?: string;
  open: boolean;
  name: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export function NameDialog(props: TNameDialogProps): JSX.Element {
  const { className } = props;
  const { onClose, onSubmit, name: defaultName, open } = props;
  const [name, setName] = React.useState<string>(defaultName);

  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = ev.currentTarget.value;
      // console.log('onChange', { name, ev });
      // debugger;
      setName(name);
    },
    [],
  );

  const onButtonSubmit = React.useCallback(() => {
    // console.log('onButtonSubmit', { name });
    // debugger;
    onSubmit(name);
  }, [name, onSubmit]);

  const onFormSubmit = React.useCallback(
    (ev?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
      ev?.preventDefault(); // Disable html form submission!
      // console.log('onFormSubmit');
      onButtonSubmit();
    },
    [onButtonSubmit],
  );

  return (
    <Dialog className={classnames(className, styles.container)} onClose={onClose} open={open}>
      <DialogTitle className={styles.dialogTitle}>Выбрать имя</DialogTitle>
      <Box m={3}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="name"
                label="Имя"
                // variant="outlined"
                variant="filled"
                defaultValue={defaultName}
                onChange={onChange}
                autoFocus
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                className="FixMuiButton"
                disabled={!name}
                onClick={onButtonSubmit}
                variant="contained"
                // variant="outlined"
                startIcon={<CheckIcon />}
                // color="success"
              >
                <span className="Text">Продолжить</span>
              </Button>
              <Button
                className="FixMuiButton"
                onClick={onClose}
                variant="outlined"
                startIcon={<CloseIcon />}
                // color="error"
              >
                <span className="Text">Отменить</span>
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
