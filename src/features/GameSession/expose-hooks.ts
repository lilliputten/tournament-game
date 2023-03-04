/** @module expose-hooks
 *  @since 2023.02.13, 20:21
 *  @changed 2023.03.04, 19:24
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TGameSessionState } from './types';
import { selectors } from './reducer';

// GameSession reducers...
export const selectGameSessionState = (state: TRootState): TGameSessionState => state.gameSession;
export const useGameSessionState = (): TGameSessionState =>
  useTypedSelector((state) => selectGameSessionState(state));

// Basic (common) hooks...
export const useGameSessionIsSessionChecking = (): ReturnType<
  typeof selectors.selectIsSessionChecking
> => selectors.selectIsSessionChecking(useGameSessionState());
export const useGameSessionIsLoading = (): ReturnType<typeof selectors.selectIsLoading> =>
  selectors.selectIsLoading(useGameSessionState());
export const useGameSessionError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useGameSessionState());

// Custom hooks
export const useGameSessionIsPlaying = (): ReturnType<typeof selectors.selectIsPlaying> =>
  selectors.selectIsPlaying(useGameSessionState());
export const useGameSessionIsFinished = (): ReturnType<typeof selectors.selectIsFinished> =>
  selectors.selectIsFinished(useGameSessionState());
export const useGameSessionGameToken = (): ReturnType<typeof selectors.selectGameToken> =>
  selectors.selectGameToken(useGameSessionState());
export const useGameSessionPartnerToken = (): ReturnType<typeof selectors.selectPartnerToken> =>
  selectors.selectPartnerToken(useGameSessionState());
export const useGameSessionPartnerName = (): ReturnType<typeof selectors.selectPartnerName> =>
  selectors.selectPartnerName(useGameSessionState());

export const useGameSessionGameResumed = (): ReturnType<typeof selectors.selectGameResumed> =>
  selectors.selectGameResumed(useGameSessionState());
export const useGameSessionQuestionsIds = (): ReturnType<typeof selectors.selectQuestionsIds> =>
  selectors.selectQuestionsIds(useGameSessionState());

// Template: export const useGameSession\u& = (): ReturnType<typeof selectors.select\u&> => selectors.select\u&(useGameSessionState());

export const useGameSessionPartnersInfo = (): ReturnType<typeof selectors.selectPartnersInfo> =>
  selectors.selectPartnersInfo(useGameSessionState());

export const useGameSessionFinishedStatus = (): ReturnType<typeof selectors.selectFinishedStatus> =>
  selectors.selectFinishedStatus(useGameSessionState());
export const useGameSessionFinishedTimestamp = (): ReturnType<
  typeof selectors.selectFinishedTimestamp
> => selectors.selectFinishedTimestamp(useGameSessionState());
export const useGameSessionFinishedTimestr = (): ReturnType<
  typeof selectors.selectFinishedTimestr
> => selectors.selectFinishedTimestr(useGameSessionState());
export const useGameSessionStartedTimestamp = (): ReturnType<
  typeof selectors.selectStartedTimestamp
> => selectors.selectStartedTimestamp(useGameSessionState());
export const useGameSessionStartedTimestr = (): ReturnType<typeof selectors.selectStartedTimestr> =>
  selectors.selectStartedTimestr(useGameSessionState());

export const useGameSessionCurrentQuestionIdx = (): ReturnType<
  typeof selectors.selectCurrentQuestionIdx
> => selectors.selectCurrentQuestionIdx(useGameSessionState());
export const useGameSessionCurrentAnswerIdx = (): ReturnType<
  typeof selectors.selectCurrentAnswerIdx
> => selectors.selectCurrentAnswerIdx(useGameSessionState());
export const useGameSessionCurrentAnswerIsCorrect = (): ReturnType<
  typeof selectors.selectCurrentAnswerIsCorrect
> => selectors.selectCurrentAnswerIsCorrect(useGameSessionState());
