/** @module GameLayout
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.17, 20:38
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';
import { Stack } from '@mui/material';

import { useGameParamsToken, useGameSessionPartnersInfo } from '@/core';
import { Partner, QuestionsCard } from '@/components/Game';

import styles from './GameLayout.module.scss';

export interface TGameLayoutProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function GameLayout(props: TGameLayoutProps): JSX.Element | null {
  const { className } = props;
  /* // @see:
   * - [Школа/ сервисы – Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)
   * - [React Typography component - Material UI](https://mui.com/material-ui/react-typography/)
   */
  // const gameMode = useGameParamsGameMode();
  // const isMulti = gameMode === 'multi';
  const currentToken = useGameParamsToken();
  const partnersInfo = useGameSessionPartnersInfo();
  const partnersContent = React.useMemo(() => {
    const tokens = partnersInfo && Object.keys(partnersInfo);
    if (!tokens || !tokens.length) {
      return null;
    }
    const orderedTokens =
      currentToken && tokens.length > 1
        ? // Put current partner to the end of the list
          tokens.filter((token) => token !== currentToken).concat(currentToken)
        : tokens;
    return orderedTokens.map((token) => {
      const info = partnersInfo[token];
      const { name, questionAnswers } = info;
      const isSelf = token === currentToken;
      return (
        <Partner
          key={token}
          self={isSelf}
          token={token}
          questionAnswers={questionAnswers}
          name={name}
          // info={info}
        />
      );
    });
  }, [partnersInfo, currentToken]);
  return (
    <Box className={classnames(className, styles.container)}>
      <Stack className={classnames(styles.partnersBox)} gap={2}>
        <Typography className={classnames(styles.partnersTitle)} variant="h6" textAlign="left">
          Участники
        </Typography>
        {partnersContent}
      </Stack>
      <Box className={classnames(styles.gameBox)}>
        <QuestionsCard className={classnames(styles.gameBox)} />
      </Box>
    </Box>
  );
}
