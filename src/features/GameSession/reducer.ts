/** @module reducer
 *  @since 2023.02.13, 20:21
 *  @changed 2023.03.04, 19:47
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameSessionState } from './types';
import { defaultState } from './constants';
import {
  TGameSessionCheckPayloadAction,
  TGameSessionStartPayloadAction,
  TGameSessionStopPayloadAction,
  gameSessionCheckThunk,
  gameSessionStartThunk,
  gameSessionStopThunk,
  gameSessionSendAnswerThunk,
  TGameSessionSendAnswerPayloadAction,
  gameSessionFinishedThunk,
  TGameSessionFinishedPayloadAction,
} from './services';
import { updatePartnersInfo } from './helpers';

const initialState: TGameSessionState = {
  ...defaultState,
};

function setCurrentQuestionIdx(
  state: TGameSessionState,
  currentQuestionIdx: TGameSessionState['currentQuestionIdx'],
) {
  state.currentQuestionIdx = currentQuestionIdx;
  state.currentAnswerIdx = undefined;
  state.currentAnswerIsCorrect = undefined;
}

function updateGameStatus(
  state: TGameSessionState,
  action: TGameSessionFinishedPayloadAction | TGameSessionCheckPayloadAction,
  opts: { omitFinishedStatus?: boolean } = {},
) {
  const {
    // status,
    // reason,
    // Game...
    gameStatus,
    finishedStatus,
    finishedTimestamp,
    finishedTimestr,
    partnersInfo,
    startedTimestamp,
    startedTimestr,
  } = action.payload;
  state.gameStatus = gameStatus;
  if (!opts.omitFinishedStatus) {
    state.isFinished = gameStatus === 'finished' || gameStatus === 'stopped';
    state.isPlaying = !state.isFinished;
  }
  // partnersInfo...
  updatePartnersInfo(state, partnersInfo);
  // Game...
  state.finishedStatus = finishedStatus;
  state.finishedTimestamp = finishedTimestamp;
  state.finishedTimestr = finishedTimestr;
  state.startedTimestamp = startedTimestamp;
  state.startedTimestr = startedTimestr;
  /* console.log('[GameSession/reducer:updateGameStatus]', {
   *   status,
   *   reason,
   *   action,
   *   // Game...
   *   gameStatus,
   *   finishedStatus,
   *   finishedTimestamp,
   *   finishedTimestr,
   *   partnersInfo,
   *   startedTimestamp,
   *   startedTimestr,
   *   // Test...
   *   isNotEmptyPartnersInfo,
   *   hasUpdatedPartnersInfo,
   * });
   */
}

type TResetDataCause = 'onFinish' | undefined;

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    resetData: (state, action: PayloadAction<TResetDataCause>) => {
      const cause = action.payload;
      // Generic state...
      state.error = undefined;
      // Game state...
      state.isPlaying = false;
      if (cause !== 'onFinish') {
        state.isFinished = false;
        state.gameStatus = undefined;
        state.gameToken = undefined;
        state.gameMode = undefined;
      }
      // Game params...
      state.partnerToken = undefined;
      state.partnerName = undefined;
      state.currentQuestionIdx = 0;
      state.currentAnswerIdx = undefined;
      state.currentAnswerIsCorrect = undefined;
    },
    resetPlayingState: (state) => {
      state.error = undefined;
      state.isPlaying = false;
      state.currentQuestionIdx = 0;
      state.currentAnswerIdx = undefined;
      state.currentAnswerIsCorrect = undefined;
    },
    setCurrentAnswerIdx: (state, action: PayloadAction<TGameSessionState['currentAnswerIdx']>) => {
      state.currentAnswerIdx = action.payload;
      state.currentAnswerIsCorrect = undefined;
    },
    // TODO: Make helpers
    setCurrentQuestionIdx: (
      state,
      action: PayloadAction<TGameSessionState['currentQuestionIdx']>,
    ) => {
      setCurrentQuestionIdx(state, action.payload);
    },
    resetQuestionAndAnswer: (state) => {
      setCurrentQuestionIdx(state, undefined);
    },
  },
  // Thunk reducers...
  extraReducers: (builder) => {
    builder
      // gameSessionStart...
      .addCase(String(gameSessionStartThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionStartThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionStartPayloadAction) => {
          const {
            // status,
            // reason,
            gameToken,
            gameMode,
            partnerName,
            partnerToken,
            gameStatus,
            gameResumed,
            questionsIds,
          } = action.payload;
          /* console.log('[GameSession/reducer:gameSessionStartThunk.fulfilled]', {
           *   // status,
           *   // reason,
           *   action,
           *   gameToken,
           *   gameStatus,
           *   gameMode,
           *   partnerName,
           *   partnerToken,
           *   gameResumed,
           *   questionsIds,
           * });
           */
          // Game params...
          state.gameToken = gameToken;
          state.gameStatus = gameStatus;
          state.isFinished = gameStatus === 'finished' || gameStatus === 'stopped';
          state.isPlaying = !state.isFinished;
          state.gameMode = gameMode;
          state.partnerName = partnerName;
          state.partnerToken = partnerToken;
          state.gameResumed = gameResumed;
          state.questionsIds = questionsIds;
          if (!gameResumed) {
            setCurrentQuestionIdx(state, 0);
            // TODO: Save to gameSessionQuestionIdx?
          }
          // Basic state...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionStartThunk.rejected),
        (state: TGameSessionState, action: TGameSessionStartPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[GameSession/reducer:gameSessionStartThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          // Game state...
          state.isPlaying = false;
          state.isFinished = false;
          // Basic state...
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // NOTE: Cycle stops in `GameSession/expose-control-node`)
        },
      )
      // gameSessionStop...
      .addCase(String(gameSessionStopThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionStopThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionStopPayloadAction) => {
          const {
            // status,
            // reason,
            gameStatus,
          } = action.payload;
          /* console.log('[GameSession/reducer:gameSessionStopThunk.fulfilled]', {
           *   status,
           *   reason,
           *   action,
           * });
           */
          state.gameStatus = gameStatus;
          state.isFinished = gameStatus === 'finished' || gameStatus === 'stopped';
          // state.isFinished = true; ???
          state.isPlaying = !state.isFinished;
          // TODO: isStopped?
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionStopThunk.rejected),
        (state: TGameSessionState, action: TGameSessionStopPayloadAction) => {
          const { error, meta } = action;
          if (error.name !== 'CanceledError') {
            // eslint-disable-next-line no-console
            console.log('[GameSession/reducer:gameSessionStopThunk.rejected]', {
              error,
              meta,
            });
            debugger; // eslint-disable-line no-debugger
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // NOTE: Cycle stops in `GameSession/expose-control-node`)
        },
      )
      // gameSessionFinished...
      .addCase(String(gameSessionFinishedThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionFinishedThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionFinishedPayloadAction) => {
          updateGameStatus(state, action);
          // Update game status...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionFinishedThunk.rejected),
        (state: TGameSessionState, action: TGameSessionFinishedPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[GameSession/reducer:gameSessionFinishedThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // NOTE: Cycle stops in `GameSession/expose-control-node`)
        },
      )
      // gameSessionCheck...
      .addCase(String(gameSessionCheckThunk.pending), (state: TGameSessionState) => {
        // NOTE: Using special loader flag
        // state.loadingCount++;
        state.isSessionChecking = true;
      })
      .addCase(
        String(gameSessionCheckThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionCheckPayloadAction) => {
          const {
            Token,
            // status,
            // reason,
            // Game...
            gameStatus,
            // finishedStatus,
            // finishedTimestamp,
            // finishedTimestr,
            partnersInfo,
            // startedTimestamp,
            // startedTimestr,
          } = action.payload;
          /* console.log('[GameSession/reducer:gameSessionCheckThunk.fulfilled]', action.payload, {
           *   status,
           *   reason,
           *   // Game...
           *   gameStatus,
           *   finishedStatus,
           *   finishedTimestamp,
           *   finishedTimestr,
           *   partnersInfo,
           *   startedTimestamp,
           *   startedTimestr,
           * });
           */
          if (gameStatus === 'finished') {
            const partnerStatuses =
              partnersInfo && Object.values(partnersInfo).map(({ status }) => status);
            const hasPlayingPartner =
              partnerStatuses && partnerStatuses.filter((status) => status !== 'finished').length;
            const yourInfo = Token && partnersInfo && partnersInfo[Token];
            const youPlaying = yourInfo && yourInfo.status !== 'finished';
            const youFinished = !youPlaying;
            const isFinished = youFinished || !hasPlayingPartner;
            /* console.log('[GameSession/reducer:gameSessionCheckThunk.fulfilled]: check finished', {
             *   isFinished,
             *   Token,
             *   partnerStatuses,
             *   hasPlayingPartner,
             *   yourInfo,
             *   youPlaying,
             *   youFinished,
             * });
             */
            state.isFinished = isFinished;
            // TODO: Detect case whan your partner finished the game
          } else {
            state.isFinished = gameStatus === 'finished' || gameStatus === 'stopped';
          }
          state.isPlaying = !state.isFinished;
          updateGameStatus(state, action, { omitFinishedStatus: true });
          // Update game status...
          state.isSessionChecking = false;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionCheckThunk.rejected),
        (state: TGameSessionState, action: TGameSessionCheckPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[GameSession/reducer:gameSessionCheckThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.isSessionChecking = false;
          // NOTE: Cycle stops in `GameSession/expose-control-node`)
        },
      )
      // gameSessionSendAnswer...
      .addCase(String(gameSessionSendAnswerThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionSendAnswerThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionSendAnswerPayloadAction) => {
          const {
            // status,
            // reason,
            isCorrect,
            partnersInfo,
            // questionAnswers,
            // questionId,
            // answerId,
          } = action.payload;
          updatePartnersInfo(state, partnersInfo);
          /* console.log('[features/GameSession/reducer:gameSessionSendAnswerThunk.fulfilled]', {
           *   isCorrect,
           *   partnersInfo,
           *   questionAnswers,
           *   questionId,
           *   answerId,
           *   status,
           *   reason,
           *   action,
           * });
           */
          // Update state...
          state.currentAnswerIsCorrect = isCorrect;
          // Basic params...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionSendAnswerThunk.rejected),
        (state: TGameSessionState, action: TGameSessionSendAnswerPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[GameSession/reducer:gameSessionSendAnswerThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // NOTE: Cycle stops in `GameSession/expose-control-node`)
        },
      );
  },
});

// Exports (see reducers creation in `src/app/app-reducer.ts`)...

// Export selecors...
export const selectors = {
  // Basic (common) selectors...
  selectIsSessionChecking: (state: TGameSessionState): TGameSessionState['isSessionChecking'] =>
    state.isSessionChecking,
  selectIsLoading: (state: TGameSessionState): TGameSessionState['isLoading'] => state.isLoading,
  selectError: (state: TGameSessionState): TGameSessionState['error'] => state.error,

  // Custom selectors...
  selectGameToken: (state: TGameSessionState): TGameSessionState['gameToken'] => state.gameToken,
  selectGameMode: (state: TGameSessionState): TGameSessionState['gameMode'] => state.gameMode,
  selectPartnerToken: (state: TGameSessionState): TGameSessionState['partnerToken'] =>
    state.partnerToken,
  selectPartnerName: (state: TGameSessionState): TGameSessionState['partnerName'] =>
    state.partnerName,

  selectGameResumed: (state: TGameSessionState): TGameSessionState['gameResumed'] =>
    state.gameResumed,
  selectQuestionsIds: (state: TGameSessionState): TGameSessionState['questionsIds'] =>
    state.questionsIds,

  selectPartnersInfo: (state: TGameSessionState): TGameSessionState['partnersInfo'] =>
    state.partnersInfo,

  selectFinishedStatus: (state: TGameSessionState): TGameSessionState['finishedStatus'] =>
    state.finishedStatus,
  selectFinishedTimestamp: (state: TGameSessionState): TGameSessionState['finishedTimestamp'] =>
    state.finishedTimestamp,
  selectFinishedTimestr: (state: TGameSessionState): TGameSessionState['finishedTimestr'] =>
    state.finishedTimestr,
  selectStartedTimestamp: (state: TGameSessionState): TGameSessionState['startedTimestamp'] =>
    state.startedTimestamp,
  selectStartedTimestr: (state: TGameSessionState): TGameSessionState['startedTimestr'] =>
    state.startedTimestr,

  selectCurrentQuestionIdx: (state: TGameSessionState): TGameSessionState['currentQuestionIdx'] =>
    state.currentQuestionIdx,
  selectCurrentAnswerIdx: (state: TGameSessionState): TGameSessionState['currentAnswerIdx'] =>
    state.currentAnswerIdx,
  selectCurrentAnswerIsCorrect: (
    state: TGameSessionState,
  ): TGameSessionState['currentAnswerIsCorrect'] => state.currentAnswerIsCorrect,

  // Basic...
  selectIsPlaying: (state: TGameSessionState): TGameSessionState['isPlaying'] => {
    return state.isPlaying;
  },
  selectIsFinished: (state: TGameSessionState): TGameSessionState['isFinished'] => state.isFinished,
};

// Actions...
export const actions = gameSessionSlice.actions;

// Core reducer...
export const reducer = gameSessionSlice.reducer;
