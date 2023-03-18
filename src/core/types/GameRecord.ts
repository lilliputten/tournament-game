import { TPartnersInfo } from './questions';
import { TToken } from './tokens';
import { TFinishedStatus } from './FinishedStatus';

export type TGameSessionFinishedStatus = string;

export interface TGameRecord {
  Token?: TToken; // Player or game token

  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionFinishedStatus;
  success: boolean; // true

  // Game params...
  gameToken?: TToken;
  gameStatus?: string;
  gameMode?: string;

  partnersInfo?: TPartnersInfo;

  finishedStatus?: TFinishedStatus; // none, all, some (?)
  winnerToken?: TToken;

  finishedTimestamp?: number;
  finishedTimestr?: string;
  startedTimestamp?: number;
  startedTimestr?: string;
}
