/** @module QuestionsCard
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.16, 02:30
 */

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import classnames from 'classnames';

import { useQuestions } from '@/core';

import styles from './QuestionsCard.module.scss';

export interface TQuestionsCardProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function QuestionsCard(props: TQuestionsCardProps) {
  const { className } = props;
  const questions = useQuestions();
  const questionsCount = questions?.length || 0;
  const currentQuestionNo = 0;
  const currentQuestion = questions && questions[currentQuestionNo];
  const questionText = currentQuestion?.question;
  const answers = currentQuestion?.answers;
  const progress = questionsCount && (currentQuestionNo + 1) / questionsCount;
  const percents = String(Math.round(progress * 100)) + '%';
  // Data receiver hook: for self record or remote partner
  console.log('[QuestionsCard]', {
    questions,
    currentQuestionNo,
    currentQuestion,
    questionsCount,
    questionText,
    answers,
    progress,
    percents,
  });
  const answersContent = React.useMemo(() => {
    if (!answers || !answers.length) {
      return null;
    }
    return answers.map((a, idx) => {
      const { text } = a;
      const key = 'A-' + idx;
      // TODO: Correct & wrong styles
      // TODO: onClick for active answers
      return (
        <Box key={key} id={key} className={classnames(styles.answer, styles.answerActive)}>
          <Typography className={classnames(styles.answerText)} textAlign="left">
            {text}
          </Typography>
        </Box>
      );
    });
  }, [answers]);
  if (!questionsCount) {
    return null;
  }
  return (
    <Stack className={classnames(className, styles.container)}>
      <Stack className={classnames(styles.infoRow)} flexDirection="row" my={1}>
        <Typography textAlign="left">Вопрос {currentQuestionNo + 1}</Typography>
        <Typography textAlign="right" flex={1}>
          из {questionsCount}
        </Typography>
      </Stack>
      <Box className={classnames(styles.progressRow)}>
        <Box className={classnames(styles.progressBar)} sx={{ width: percents }} />
      </Box>
      <Box className={classnames(styles.questionRow)} my={1} mt={2}>
        <Typography variant="h5">{questionText}</Typography>
      </Box>
      <Box className={classnames(styles.answersRow)} my={1}>
        {answersContent}
      </Box>
      <Box className={classnames(styles.actionsRow)} my={2}>
        <Button className="FixMuiButton" variant="contained">
          <span className="Text">Следующий вопрос / Проверить</span>
        </Button>
      </Box>
    </Stack>
  );
}
