/** @module Partner
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.16, 02:30
 */

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import classnames from 'classnames';

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
  const { name } = data;
  const selfId = self ? 'self' : 'other';
  const questions: TQuestions | undefined = useQuestions();
  // const questions = demoQuestions; // DEBUG
  /* console.log('[Partner]', {
   *   questions,
   *   // token,
   *   name,
   *   data,
   *   self,
   *   useData,
   * });
   */
  const questionsContent = React.useMemo(() => {
    if (!questions || !questions.length) {
      return null;
    }
    return questions.map((q, idx) => {
      const { id } = q;
      const key = id || 'Q-' + idx;
      // TODO: Correct & wrong styles
      return <Box key={key} id={key} className={classnames(styles.question)} />;
    });
  }, [questions]);
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
