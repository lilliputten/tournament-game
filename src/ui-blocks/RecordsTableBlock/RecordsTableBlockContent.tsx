import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import classnames from 'classnames';

import config from '@/config';
import { getDurationString } from '@/utils';
import { TGameRecord, TGameToken, TQuestionAnswers, TRecordsTable, TToken } from '@/core';

import styles from './RecordsTableBlockContent.module.scss';

export type TCb = () => void;

export function Empty({ reason }: { reason?: string }) {
  return (
    <Box data-reason={reason || null} className={classnames(styles.container, styles.Empty)}>
      {config.build.isDev && reason && <Typography>WatingBlock Empty: {reason}</Typography>}
    </Box>
  );
}

interface TRecordsTableProps {
  onClick?: TCb;
  goToStartPage?: TCb;
  token?: TToken;
  gameToken?: TGameToken;
  recordsTable?: TRecordsTable;
}

/* Table Columns:
 * - Place
 * - Name
 * - Answers
 * - Time
 */

function ShowRow({
  gameRecord,
  activeGameToken,
  idx,
}: {
  gameRecord: TGameRecord;
  activeGameToken?: TGameToken;
  idx: number;
}) {
  const {
    Token, // '230305-052707-183-5323278'
    // finishedByPartner, // '230211-165455-365-5694359'
    // finishedStatus, // 'all'
    // finishedTimestamp, // 1677968835348
    // finishedTimestr, // '2023.03.05 05:27:15'
    // gameMode, // 'single'
    // gameStatus, // 'finished'
    // gameToken, // '230305-052707-183-5323278'
    // lastAnswerTimestamp, // 1677968831867
    // lastAnswerTimestr, // '2023.03.05 05:27:11'
    // lastAnsweredBy, // '230211-165455-365-5694359'
    // lastCheckTimestamp, // 1677968828564
    // lastCheckTimestr, // '2023.03.05 05:27:08'
    // lastCheckedBy, // '230211-165455-365-5694359'
    // partners, // ['230211-165455-365-5694359']
    partnersInfo, // {230211-165455-365-5694359: {…}}
    // questionsIds, // ['Rekvizity-kakogo-UFK']
    startedTimestamp, // 1677968827183
    // startedTimestr, // '2023.03.05 05:27:07'
    // timestamp, // 1677968835348
    // timestr, // '2023.03.05 05:27:15'
    winnerToken, // '230211-165455-365-5694359'
  } = gameRecord;
  const isActiveGame = Token === activeGameToken;
  const winner = winnerToken && partnersInfo && partnersInfo[winnerToken];
  const no = idx + 1;
  const name = (winner && winner.name) || undefined;
  const questionAnswers: TQuestionAnswers | undefined =
    (winner && winner.questionAnswers) || undefined;
  const answers = questionAnswers && Object.values(questionAnswers);
  const totalAnswersCount = answers ? answers.length : 0;
  const correctAnswersCount =
    answers && answers.reduce((summ, value) => (value === 'correct' ? summ + 1 : summ), 0);
  const finishedTimestamp = (winner && winner.finishedTimestamp) || undefined;
  const duration = getDurationString(startedTimestamp, finishedTimestamp);
  // prettier-ignore
  return (
    <tr
      id={Token}
      className={classnames(
        styles.tableRow,
        styles['tableRow' + no],
        isActiveGame && styles.activeGame,
      )}
    >
      <td className={classnames(styles.tableCell, styles.cellNo)}>{no}</td>
      <td className={classnames(styles.tableCell, styles.cellName)}>{name}</td>
      <td className={classnames(styles.tableCell, styles.cellAnswers)}>
        {correctAnswersCount} / {totalAnswersCount}
      </td>
      <td className={classnames(styles.tableCell, styles.cellTime)}>{duration}</td>
    </tr>
  );
}

function ShowTable({
  recordsTable,
  gameToken,
}: {
  recordsTable?: TRecordsTable;
  gameToken?: TGameToken;
}) {
  const isRecordsTable = !!(recordsTable && recordsTable.length);
  const rows = React.useMemo(
    () =>
      isRecordsTable &&
      recordsTable.map((gameRecord, idx) => (
        <ShowRow
          key={gameRecord.Token}
          idx={idx}
          gameRecord={gameRecord}
          activeGameToken={gameToken}
        />
      )),
    [isRecordsTable, recordsTable, gameToken],
  );
  if (!isRecordsTable) {
    return <Typography>Турнирная таблица пока пуста.</Typography>;
  }
  return (
    <>
      <Box className={styles.tableTitle}>Турнирная таблица</Box>
      <table className={styles.table} cellPadding={4} cellSpacing={2} width="100%" border={0}>
        <thead className={styles.tableHeadRow}>
          <tr className={classnames(styles.tableRow, styles.tableHeadRow)}>
            <th className={classnames(styles.tableHeadCell, styles.cellNo)}>Место</th>
            <th className={classnames(styles.tableHeadCell, styles.cellName)}>Игрок</th>
            <th className={classnames(styles.tableHeadCell, styles.cellAnswers)}>Верных ответов</th>
            <th className={classnames(styles.tableHeadCell, styles.cellTime)}>Время</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>{rows}</tbody>
      </table>
    </>
  );
}

export function RecordsTableContent(props: TRecordsTableProps) {
  const { onClick, goToStartPage, recordsTable, gameToken } = props;
  const isFinishedGame = !!gameToken;
  return (
    <Box className={classnames(styles.container, styles.WaitingFailed)}>
      <ShowTable recordsTable={recordsTable} gameToken={gameToken} />
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
        {!!onClick && isFinishedGame && (
          <Button className="FixMuiButton" onClick={onClick} disabled={!onClick}>
            <span className="Text">Посмотреть результаты</span>
          </Button>
        )}
      </Stack>
    </Box>
  );
}
