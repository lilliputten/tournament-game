/** @module Partner
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.15, 23:03
 */

import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import { Box, Stack, Typography } from '@mui/material';
import classnames from 'classnames';

import { stringToHash } from '@/utils';
import { useYourData, usePartnerData } from './usePartnerData';
import { TQuestions, useQuestions } from '@/core';

import styles from './Partner.module.scss';

export interface TPartnerProps extends JSX.IntrinsicAttributes {
  className?: string;
  self?: boolean;
}

/* // DEBUG
 * const demoQuestions: TQuestions = [
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 *   { answers: [{ text: 'Answer text 1' }], question: 'Question 1' },
 * ];
 */

export function Partner(props: TPartnerProps): JSX.Element | null {
  const { className, self } = props;
  // Data receiver hook: for self record or remote partner
  const useData = React.useMemo(() => (self ? useYourData : usePartnerData), [self]);
  const data = useData();
  const { token, name } = data;
  const selfId = self ? 'self' : 'other';
  const questions: TQuestions | undefined = useQuestions();
  // const questions = demoQuestions; // DEBUG
  console.log('[Partner]', {
    questions,
    token,
    name,
    data,
    self,
    useData,
  });
  const questionsContent = React.useMemo(() => {
    if (!questions || !questions.length) {
      return null;
    }
    return questions.map((q, idx) => {
      const key = 'question-' + idx + '-' + stringToHash(String(q.question || ''));
      return <Box key={key} id={key} className={classnames(styles.question)} />;
    });
  }, [questions]);
  return (
    <Box className={classnames(className, styles.container, styles[selfId])}>
      <Box className={classnames(styles.partner)}>
        <Typography
          className={classnames(styles.name)}
          variant="body1"
          textAlign="left"
          gutterBottom
        >
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
