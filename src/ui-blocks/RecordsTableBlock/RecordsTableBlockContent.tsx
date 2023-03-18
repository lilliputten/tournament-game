import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import classnames from 'classnames';
import { format } from 'date-fns';

import config from '@/config';
import { getDurationString } from '@/utils';
import { TGameToken, TRecordEntry, TRecordsTable, TToken } from '@/core';

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
  recordEntry,
  token,
  activeGameToken,
  idx,
}: {
  recordEntry: TRecordEntry;
  token?: TToken;
  activeGameToken?: TGameToken;
  idx: number;
}) {
  const no = idx + 1;
  const {
    // finishedByPartner, // '230317-125246-307-744394'
    // finishedStatus, // 'all'
    finishedTimestamp, // 1679034851649
    // finishedTimestr, // '2023.03.17 13:34:11'
    // gameMode, // 'multi'
    // gameStatus, // 'finished'
    gameToken, // '230317-132512-472-5153359'
    // lastAnswerTimestamp, // 1679034850533
    // lastAnswerTimestr, // '2023.03.17 13:34:10'
    // lastAnsweredBy, // '230317-125246-307-744394'
    // lastCheckTimestamp, // 1679034850255
    // lastCheckTimestr, // '2023.03.17 13:34:10'
    // lastCheckedBy, // '230317-125246-307-744394'
    name, // 'fox'
    partnerToken, // '230317-125246-307-744394'
    questionAnswers, // {Buhgalter-kompanii-pri-zapolnen: 'wrong', Rekvizity-kakogo-UFK: 'wrong'}
    // questionsIds, // (2) ['Rekvizity-kakogo-UFK', 'Buhgalter-kompanii-pri-zapolnen']
    startedTimestamp, // 1679034312471
    // startedTimestr, // '2023.03.17 13:25:12'
    // status, // 'finished'
    // winnerToken, // '230310-134747-174-765536'
  } = recordEntry; // New variant (game record entries
  const isActiveGame = gameToken === activeGameToken && partnerToken === token;
  const answers = questionAnswers && Object.values(questionAnswers);
  const totalAnswersCount = answers ? answers.length : 0;
  const correctAnswersCount =
    answers && answers.reduce((summ, value) => (value === 'correct' ? summ + 1 : summ), 0);
  const finishedStr =
    finishedTimestamp && format(new Date(finishedTimestamp), config.constants.dateTimeFormat);
  const duration = getDurationString(startedTimestamp, finishedTimestamp);
  const recordId = gameToken + '/' + partnerToken;
  // prettier-ignore
  return (
    <tr
      id={recordId}
      className={classnames(
        styles.tableRow,
        styles['tableRow' + no],
        isActiveGame && styles.activeGame,
      )}
    >
      <td className={classnames(styles.tableCell, styles.cellNo)}>{no}</td>
      <td className={classnames(styles.tableCell, styles.cellName)}>{name}</td>
      <td className={classnames(styles.tableCell, styles.cellAnswers)}>
        {correctAnswersCount}{!!totalAnswersCount && ' / ' + totalAnswersCount}
      </td>
      <td className={classnames(styles.tableCell, styles.cellTime)}>{duration}</td>
      <td className={classnames(styles.tableCell, styles.cellDate)}>{finishedStr}</td>
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
      recordsTable.map((recordEntry, idx) => (
        <ShowRow
          key={recordEntry.gameToken + '/' + recordEntry.partnerToken}
          idx={idx}
          recordEntry={recordEntry}
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
            <th className={classnames(styles.tableHeadCell, styles.cellDate)}>Дата</th>
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
