/** @module StartBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.09, 23:05
 */

import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import { NameDialog } from '@/ui-blocks/NameDialog';

// import { TReactContent } from '@/utils/react-types';
import { useAppInfo } from './useAppInfo';

import styles from './StartBlock.module.scss';

export interface TStartBlockProps {
  className?: string;
}

const hasLocalStorage = typeof localStorage !== 'undefined';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function StartBlock(props: TStartBlockProps): JSX.Element {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */

  // DEBUG: Test api requests...
  const result = useAppInfo();
  React.useEffect(() => {
    console.log('[StartBlock:useAppInfo]', result);
  }, [result]);

  const [choosingName, startChoosingNameFlag] = React.useState(true);
  const [name, setName] = React.useState<string>(
    (hasLocalStorage && localStorage.getItem('name')) || '',
  );
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const updateName = React.useCallback((name: string) => {
    console.log('[StartBlock:updateName]', { name });
    debugger;
    setName(name);
    hasLocalStorage && localStorage.setItem('name', name);
    // TODO...
  }, []);

  const startChoosingName = React.useCallback(() => {
    startChoosingNameFlag(true);
  }, []);

  const stopChoosingName = React.useCallback(() => {
    console.log('[StartBlock:stopChoosingName]');
    debugger;
    startChoosingNameFlag(false);
  }, []);

  const handleChoosenName = React.useCallback(
    (name: string) => {
      console.log('[StartBlock:handleChoosenName]', { name });
      debugger;
      updateName(name);
      startChoosingNameFlag(false);
    },
    [updateName],
  );

  return (
    <Box className={classnames(className, styles.container)} m={2}>
      <Typography variant="h5" gutterBottom className={classnames(styles.title)}>
        Турнир по теме «Что проверить в договорах»
      </Typography>
      <Typography variant="body1" gutterBottom className={classnames(styles.question)}>
        Как вы хотите сыграть?
      </Typography>
      <ButtonGroup
        className={classnames(styles.actions)}
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button
          //
          className="FixMuiButton"
        >
          <span className="Text">Турнир для одного</span>
        </Button>
        <Button
          //
          className="FixMuiButton"
        >
          <span className="Text">Турнир для двоих</span>
        </Button>
      </ButtonGroup>
      <NameDialog
        //
        name={name}
        // selectedValue={selectedValue}
        open={choosingName}
        onClose={stopChoosingName}
        onSubmit={handleChoosenName}
      />
    </Box>
  );
}
