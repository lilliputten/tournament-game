/** @module StartBlock
 *  @since 2023.02.07, 20:35
 *  @changed 2023.02.07, 20:35
 */

import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

// import { TReactContent } from '@/utils/react-types';

import styles from './StartBlock.module.scss';

export interface TStartBlockProps {
  className?: string;
}

export function StartBlock(props: TStartBlockProps): JSX.Element {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */
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
        <Button>Турнир для одного</Button>
        <Button>Турнир для двоих</Button>
      </ButtonGroup>
    </Box>
  );
}
