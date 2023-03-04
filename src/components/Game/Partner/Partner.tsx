/** @module Partner
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.17, 20:38
 */

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import classnames from 'classnames';

import { TQuestionAnswers, TQuestions, TToken, useGameQuestions } from '@/core';

import styles from './Partner.module.scss';

export interface TPartnerProps extends JSX.IntrinsicAttributes {
  className?: string;
  self?: boolean;
  token: TToken;
  // info: TPartnerInfo;
  name: string;
  questionAnswers?: TQuestionAnswers;
}

export function Partner(props: TPartnerProps): JSX.Element | null {
  const { className, self, name, questionAnswers } = props;

  /* // Data receiver hook: for self record or remote partner
   * const useData = React.useMemo(() => (self ? useYourData : usePartnerData), [self]);
   * const data = useData();
   * const { name } = data;
   */

  const selfId = self ? 'self' : 'other';
  const questions: TQuestions | undefined = useGameQuestions();

  const questionsContent = React.useMemo(() => {
    if (!questions || !questions.length) {
      return null;
    }
    return questions.map((q, idx) => {
      const { id } = q;
      const key = id || 'Q-' + idx;
      const answer = questionAnswers && questionAnswers[id];
      const isCorrect = answer && answer === 'correct';
      const isWrong = answer && answer === 'wrong';
      // Correct & wrong styles
      const className = classnames(
        styles.question,
        (isCorrect || isWrong) && !self && styles.questionFinished,
        isCorrect && self && styles.questionCorrect,
        isWrong && self && styles.questionWrong,
      );
      return <Box key={key} id={key} className={className} />;
    });
  }, [questions, questionAnswers, self]);

  return (
    <Box className={classnames(className, styles.container, styles[selfId])}>
      <Box className={classnames(styles.partner)}>
        <Typography className={classnames(styles.name)} textAlign="left" gutterBottom>
          {name}
        </Typography>
        {questionsContent && (
          <Stack
            className={classnames(styles.questionsBox)}
            flexDirection="row"
            flexWrap="wrap"
            gap="6px"
          >
            {questionsContent}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
