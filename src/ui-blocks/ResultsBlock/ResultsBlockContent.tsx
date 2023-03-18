import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import classnames from 'classnames';
import { getDurationString } from '@/utils';

import config from '@/config';

import styles from './ResultsBlockContent.module.scss';
import { TPartnerInfo, TPartnersInfo, TQuestionAnswers, TQuestions, TToken } from '@/core';

import candySvg from './assets/candy.svg';
import cupWinnerSvg from './assets/cup-winner.svg';
// import waitingForPartnerGif from './assets/waiting-for-partner.gif';
import waitingForPartnerGif from './assets/clock.gif';

export interface TResultsBlockProps extends JSX.IntrinsicAttributes {
  className?: string;
}

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)}>
      {config.build.isDev && reason && <Typography>WatingBlock Empty: {reason}</Typography>}
    </Box>
  );
}

interface TGameInfo {
  onClick?: TCb;
  goToStartPage?: TCb;
  finishedTimestamp?: number;
  startedTimestamp?: number;
  partnersInfo?: TPartnersInfo;
  token?: TToken;
  questions?: TQuestions;
  // useGameResultStatus...
  isSingle: boolean;
  isWinner: boolean | undefined;
  isFinished: boolean;
  isWaitingForOtherPlayer: boolean;
}

function ShowResultText(props: TGameInfo) {
  const { isWinner, isWaitingForOtherPlayer } = props;
  if (isWinner == undefined) {
    return (
      <Typography variant="h5" gutterBottom>
        Игра завершена!
      </Typography>
    );
  }
  if (isWinner) {
    return (
      <Typography variant="h5" gutterBottom>
        Вы победили в этой игре!
      </Typography>
    );
  }
  if (isWaitingForOtherPlayer) {
    return (
      <Typography variant="h5" gutterBottom>
        Результат игры ещё не известен.
      </Typography>
    );
  }
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Увы, но вы не победили.
      </Typography>
      <Typography gutterBottom mb={2}>
        Хотите сыграть еще раз?
      </Typography>
    </>
  );
}

function getCorrectAnswersCount(partnerInfo?: TPartnerInfo): number {
  if (!partnerInfo) {
    return 0;
  }
  const questionAnswers: TQuestionAnswers | undefined =
    (partnerInfo && partnerInfo.questionAnswers) || undefined;
  const correctAnswersCount =
    questionAnswers &&
    Object.values(questionAnswers).filter((result) => result === 'correct').length;
  return correctAnswersCount || 0;
}

function ShowResultIcon(props: TGameInfo) {
  const { isWinner, isSingle, partnersInfo, token, questions, isWaitingForOtherPlayer } = props;
  if (isWaitingForOtherPlayer) {
    return (
      <Stack className={styles.waitingForPartnerIcon} alignItems="center" justifyContent="center">
        <Image src={waitingForPartnerGif} width={312} height={312} alt="Ожидаем партнёра" />
      </Stack>
    );
  }
  if (isWinner == undefined && !isSingle) {
    return null;
  }
  // Get correct answers count...
  const selfInfo = (partnersInfo && token && partnersInfo[token]) || undefined;
  const isSingleWinnerLike =
    isSingle && getCorrectAnswersCount(selfInfo) * 2 >= (questions?.length || 0);
  if (isWinner || isSingleWinnerLike) {
    // return <CupWinnerSvg className={styles.image} />;
    return (
      <Image src={cupWinnerSvg as unknown as string} width={165} height={184} alt="Вы победили!" />
    );
  }
  // return <CandySvg className={styles.image} />;
  return (
    <Image src={candySvg as unknown as string} width={184} height={102} alt="Вы завершили игру" />
  );
}

function ShowPartnerInfo(props: {
  showName?: boolean;
  partnerInfo: TPartnerInfo;
  startedTimestamp?: number;
  questionsCount: number;
}) {
  const { showName, startedTimestamp, questionsCount, partnerInfo } = props;
  const { name, finishedTimestamp } = partnerInfo;

  // Get duration string...
  const duration = getDurationString(startedTimestamp, finishedTimestamp);

  // Get correct answers count...
  const correctAnswersCount = getCorrectAnswersCount(partnerInfo);

  return (
    <>
      {showName && name && name + ': '}
      {correctAnswersCount} из {questionsCount}
      {duration && ' за ' + duration}
    </>
  );
}

function ShowPartnerResults(props: TGameInfo) {
  const { startedTimestamp, partnersInfo, token, questions } = props;
  const otherTokens = partnersInfo && Object.keys(partnersInfo).filter((key) => key !== token);
  const otherPartners =
    partnersInfo && otherTokens && otherTokens.map((tkn) => ({ token: tkn, ...partnersInfo[tkn] }));
  if (!otherPartners || !otherPartners.length) {
    return null;
  }
  const questionsCount = questions ? questions.length : 0;

  if (otherPartners.length === 1) {
    const partnerInfo = otherPartners[0];
    return (
      <>
        Ваш партнёр {partnerInfo.name}:{' '}
        <ShowPartnerInfo
          partnerInfo={partnerInfo}
          questionsCount={questionsCount}
          startedTimestamp={startedTimestamp}
        />
      </>
    );
  } else {
    return (
      <>
        Ваши партнёры:{' '}
        {otherPartners.map((partnerInfo, n) => {
          return (
            <>
              {!!n && ', '}
              <ShowPartnerInfo
                key={partnerInfo.token}
                partnerInfo={partnerInfo}
                questionsCount={questionsCount}
                startedTimestamp={startedTimestamp}
                showName
              />
            </>
          );
        })}
      </>
    );
  }
}

function getOtherPartnersRemainedQuestions(props: TGameInfo): number | undefined {
  const { partnersInfo, token, questions } = props;
  const totalQuestionsCount = questions ? questions.length : 0;
  const otherAnswers =
    partnersInfo &&
    Object.entries(partnersInfo)
      .filter(([thisToken]) => token !== thisToken)
      .map(([_token, info]) =>
        info.questionAnswers ? Object.keys(info.questionAnswers).length : 0,
      )
      .map((answersCount) => totalQuestionsCount - answersCount)
      .reduce((sum, otherAnswers) => sum + otherAnswers, 0);
  return otherAnswers;
}

function ShowInfo(props: TGameInfo) {
  const {
    finishedTimestamp,
    startedTimestamp,
    partnersInfo,
    token,
    questions,
    isWaitingForOtherPlayer,
  } = props;

  // Get correct answers count...
  const selfInfo = partnersInfo && token && partnersInfo[token];
  const correctAnswersCount = selfInfo && getCorrectAnswersCount(selfInfo);

  // Get duration string...
  const duration = getDurationString(
    startedTimestamp,
    (selfInfo && selfInfo.finishedTimestamp) || finishedTimestamp,
  );

  // Questions...
  const questionsCount = questions ? questions.length : 0;

  if (typeof correctAnswersCount == undefined || !questionsCount) {
    return null;
  }

  const otherPartnersRemainedQuestions =
    isWaitingForOtherPlayer && getOtherPartnersRemainedQuestions(props);

  const partnersCount = partnersInfo ? Object.keys(partnersInfo).length : 0;

  return (
    <>
      {isWaitingForOtherPlayer && (
        <Typography gutterBottom>
          Ждём, пока {partnersCount > 2 ? 'ваши соперники завершат' : 'ваш соперник завершит'} свою
          игру
          {!!otherPartnersRemainedQuestions &&
            otherPartnersRemainedQuestions > 0 &&
            ' (осталось неотвеченных вопросов: ' + otherPartnersRemainedQuestions + ')'}
          .
        </Typography>
      )}
      <Typography gutterBottom>
        Ваш результат: {correctAnswersCount} из {questionsCount}
        {duration && ' за ' + duration}
      </Typography>
      {/* TODO: Show partner(s) results? */}
      {!isWaitingForOtherPlayer && <ShowPartnerResults {...props} />}
    </>
  );
}

export function GameInfo(props: TGameInfo) {
  const { onClick, goToStartPage } = props;
  return (
    <Box className={classnames(styles.container, styles.WaitingFailed)}>
      <ShowResultIcon {...props} />
      <ShowResultText {...props} />
      <ShowInfo {...props} />
      {/*
      <Typography variant="h5">Ура! Вы победили в этой игре</Typography>
      <Typography>Ваш результат 4 правильных ответа из 10 за 1:45 секунд</Typography>
      */}
      <Stack
        className={styles.actions}
        spacing={2}
        direction="row"
        justifyContent="center"
        my={2}
        mt={4}
      >
        {!!goToStartPage && (
          <Button className="FixMuiButton" onClick={goToStartPage} variant="contained">
            <span className="Text">Сыграть ещё раз</span>
          </Button>
        )}
        <Button className="FixMuiButton" onClick={onClick} disabled={!onClick}>
          <span className="Text">Посмотреть турнирную таблицу</span>
        </Button>
      </Stack>
    </Box>
  );
}
