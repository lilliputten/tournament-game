/** @module QuestionsCard
 *  @since 2023.02.15, 19:54
 *  @changed 2023.02.17, 05:02
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Stack, Typography } from '@mui/material';
import classnames from 'classnames';

import { store } from '@/core/app/app-store';
import {
  cancelAllActiveRequests,
  // TAnswer,
  useAppDispatch,
  useGameSessionCurrentAnswerIdx,
  useGameSessionCurrentAnswerIsCorrect,
  useGameSessionCurrentQuestionIdx,
  useGameSessionIsFinished,
  useGameSessionIsLoading,
  useQuestions,
} from '@/core';
import {
  gameSessionFinishedThunk,
  gameSessionSendAnswerThunk,
  gameSessionStopThunk,
  saveGameSessionQuestionIdxThunk,
  TGameSessionQuestionIdxPayloadAction,
} from '@/features/GameSession/services';
import { actions as gameSessionActions } from '@/features/GameSession/reducer';

import styles from './QuestionsCard.module.scss';

export interface TQuestionsCardProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export function QuestionsCard(props: TQuestionsCardProps) {
  const { className } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useGameSessionIsLoading();
  const isFinished = useGameSessionIsFinished();

  // Is game finished?
  React.useEffect(() => {
    if (isFinished) {
      debugger;
      router.push('/results');
    }
  }, [isFinished, router]);

  const currentAnswerIsCorrect = useGameSessionCurrentAnswerIsCorrect();
  const currentAnswerIdx = useGameSessionCurrentAnswerIdx();
  const hasAnswered = currentAnswerIdx != undefined;

  const hasChecked = currentAnswerIsCorrect !== undefined;

  // Get data...
  const questions = useQuestions();
  const questionsCount = questions?.length || 0;
  const currentQuestionIdx = useGameSessionCurrentQuestionIdx(); // NOTE: Can be undefined!
  const isReady = currentQuestionIdx != undefined;
  const questionIdx = currentQuestionIdx || 0;
  const questionNo = questionIdx + 1;
  const isLastQuestion = questionNo === questionsCount;
  const currentQuestion = questions && questions[questionIdx];
  const questionId = currentQuestion?.id;
  const questionText = currentQuestion?.question;
  const answers = currentQuestion?.answers;
  const currentAnswer =
    (hasAnswered && Array.isArray(answers) && answers[currentAnswerIdx]) || undefined;
  const answerId = currentAnswer?.id;
  const progress = questionsCount && questionNo / questionsCount;
  const percents = String(Math.round(progress * 100)) + '%';
  // Data receiver hook: for self record or remote partner
  console.log('[QuestionsCard]', {
    // store,
    isFinished,
    questions,
    currentQuestionIdx,
    questionNo,
    currentQuestion,
    questionsCount,
    questionText,
    answers,
    progress,
    percents,
  });

  const handleAnswer = React.useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget } = ev;
      const answerIdx = Number(currentTarget.dataset['answer']);
      // const answer = answers?.[answerIdx];
      // TODO: Check for active answers, send data to server, receive answer status (in reducer)
      console.log('[QuestionsCard:handleAnswer]', { answerIdx });
      dispatch(gameSessionActions.setCurrentAnswerIdx(answerIdx));
    },
    [dispatch],
  );

  // Create answers list...
  const answersContent = React.useMemo(() => {
    if (!answers || !answers.length) {
      return null;
    }
    return answers.map((a, idx) => {
      const { text } = a;
      const key = 'A-' + idx;
      // TODO: Correct & wrong styles
      // TODO: onClick for active answers
      const isActive = !isLoading && !hasChecked;
      const isCurrent = idx === currentAnswerIdx;
      const isChecked = isActive && hasAnswered && isCurrent;
      const isCurrentChecked = hasChecked && isCurrent;
      const isCurrentCheckedCorrect = isCurrentChecked && !!currentAnswerIsCorrect;
      const isCurrentCheckedWrong = isCurrentChecked && !currentAnswerIsCorrect;
      const className = classnames(
        styles.answer,
        isActive && styles.answerActive,
        isChecked && styles.answerChecked,
        isCurrentCheckedCorrect && styles.answerCorrect,
        isCurrentCheckedWrong && styles.answerWrong,
        isLoading && isCurrent && styles.answerLoading,
      );
      return (
        <Box
          key={key}
          id={key}
          data-answer={String(idx)}
          className={className}
          onClick={isActive ? handleAnswer : undefined}
        >
          <Typography className={classnames(styles.answerText)} textAlign="left">
            {text}
          </Typography>
        </Box>
      );
    });
  }, [
    answers,
    isLoading,
    hasChecked,
    currentAnswerIdx,
    hasAnswered,
    currentAnswerIsCorrect,
    handleAnswer,
  ]);

  const handleCancel = React.useCallback(() => {
    // Send cancel request (to stop game), go to main page
    dispatch(gameSessionStopThunk());
    cancelAllActiveRequests();
    router.push('/');
  }, [router, dispatch]);

  const checkAnswers = React.useCallback(() => {
    if (!questionId || !answerId) {
      const error = new Error('Answer params is undefined');
      console.error;
      // eslint-disable-next-line no-console
      console.error('[QuestionsCard]: checkAnswers: error', {
        error,
        questionId,
        answerId,
      });
      debugger; // eslint-disable-line no-debugger
      throw error;
    }
    // Send cancel request (to stop game), go to main page
    const params = {
      questionId,
      answerId,
    };
    console.log('[QuestionsCard:checkAnswers]', params);
    // debugger;
    dispatch(gameSessionSendAnswerThunk(params));
  }, [questionId, answerId, dispatch]);

  const goToNextQuestion = React.useCallback(() => {
    // Send cancel request (to stop game), go to main page
    const nextQuestionIdx = questionIdx + 1;
    console.log('[QuestionsCard:goToNextQuestion]', { questionIdx, nextQuestionIdx });
    dispatch(saveGameSessionQuestionIdxThunk({ questionIdx: nextQuestionIdx })).then(
      (action: TGameSessionQuestionIdxPayloadAction) => {
        const { questionIdx } = action.payload;
        return dispatch(gameSessionActions.setCurrentQuestionIdx(questionIdx));
      },
    );
    // TODO: May be promised further...
  }, [dispatch, questionIdx]);

  const goToResults = React.useCallback(() => {
    // Send cancel request (to stop game), go to main page
    console.log('[QuestionsCard:goToResults]');
    dispatch(gameSessionActions.resetQuestionAndAnswer());
    dispatch(gameSessionFinishedThunk());
    dispatch(gameSessionActions.setCurrentQuestionIdx(0));
    // Go to results page
    router.push('/results');
  }, [dispatch, router]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack className={classnames(className, styles.container)}>
      <Stack className={classnames(styles.infoRow)} flexDirection="row" my={1}>
        <Typography textAlign="left">Вопрос {questionNo}</Typography>
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
      <Box className={classnames(styles.answersRow, isLoading && styles.answersLoading)} my={1}>
        {answersContent}
      </Box>
      <Stack
        className={classnames(styles.actionsRow)}
        my={2}
        flexDirection="row"
        gap={1}
        flexWrap="wrap"
      >
        <Button
          className="FixMuiButton"
          variant="contained"
          disabled={!hasAnswered || isLoading}
          onClick={!hasChecked ? checkAnswers : !isLastQuestion ? goToNextQuestion : goToResults}
        >
          <span className="Text">
            {!hasChecked ? 'Проверить' : !isLastQuestion ? 'Следующий вопрос' : 'Завершить'}
          </span>
        </Button>
        <Button className="FixMuiButton" variant="outlined" onClick={handleCancel}>
          <span className="Text">Отказаться от игры</span>
        </Button>
      </Stack>
    </Stack>
  );
}
