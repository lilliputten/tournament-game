import { TQuestionAnswers } from './questions';
import { TToken } from './tokens';
import { TFinishedStatus } from './FinishedStatus';
import { TGameSessionFinishedStatus } from './GameRecord';

export interface TRecordEntry {
  // Token?: TToken; // Player or game token

  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionFinishedStatus;
  success: boolean; // true

  // Game params...
  gameToken?: TToken;
  gameStatus?: string;
  gameMode?: string;

  questionAnswers?: TQuestionAnswers;
  questionsIds: string[]; // (2) ['Rekvizity-kakogo-UFK', 'Buhgalter-kompanii-pri-zapolnen']

  partnerToken: TToken; // '230317-125246-307-744394'
  name: string;

  finishedStatus: TFinishedStatus; // none, all, some (?)
  winnerToken: TToken;
  isWinner: boolean;
  finishedByPartner: TToken; // '230317-125246-307-744394'
  lastAnsweredBy?: TToken; // '230317-125246-307-744394'
  lastCheckedBy?: TToken; // '230317-125246-307-744394'

  finishedTimestamp?: number;
  finishedTimestr?: string;
  startedTimestamp?: number;
  startedTimestr?: string;

  lastAnswerTimestamp?: number; // 1679034850533
  lastAnswerTimestr?: string; // '2023.03.17 13:34:10'
  lastCheckTimestamp?: number; // 1679034850255
  lastCheckTimestr?: string; // '2023.03.17 13:34:10'
}
