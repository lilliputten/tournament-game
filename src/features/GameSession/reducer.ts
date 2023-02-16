/** @module reducer
 *  @since 2023.02.13, 20:21
 *  @changed 2023.02.15, 01:34
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
} from './services';

const initialState: TGameSessionState = {
  ...defaultState,
};

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    resetData: (state) => {
      // Generic state...
      state.error = undefined;
      // Game state...
      state.isPlaying = false;
      state.isFinished = false;
      // Game params...
      state.gameToken = undefined;
      state.gameMode = undefined;
      state.partnerToken = undefined;
      state.partnerName = undefined;
      state.currentQuestionIdx = 0;
      state.currentAnswerIdx = undefined;
      state.currentAnswerIsCorrect = undefined;
    },
    setCurrentAnswerIdx: (state, action: PayloadAction<TGameSessionState['currentAnswerIdx']>) => {
      state.currentAnswerIdx = action.payload;
      state.currentAnswerIsCorrect = undefined;
    },
    goToNextAnswer: (state) => {
      // Check answer in answers?
      state.currentAnswerIdx = state.currentAnswerIdx == undefined ? 0 : state.currentAnswerIdx + 1;
      state.currentAnswerIsCorrect = undefined;
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
          } = action.payload;
          /* console.log('[features/GameSession/reducer:gameSessionStartThunk.fulfilled]', {
           *   status,
           *   reason,
           *   action,
           *   gameToken,
           *   gameMode,
           *   partnerName,
           *   partnerToken,
           * });
           */
          // Game params...
          state.gameToken = gameToken;
          state.gameMode = gameMode;
          state.partnerName = partnerName;
          state.partnerToken = partnerToken;
          // Game state...
          state.isPlaying = true;
          state.isFinished = false;
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
          console.error('[features/GameSession/reducer:gameSessionStartThunk.rejected]', {
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
      // gameSessionCheck...
      .addCase(String(gameSessionCheckThunk.pending), (state: TGameSessionState) => {
        // state.loadingCount++;
        state.isSessionChecking = true;
      })
      .addCase(
        String(gameSessionCheckThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionCheckPayloadAction) => {
          const { status, reason, currentQuestionIdx = 0 } = action.payload;
          console.log('[features/GameSession/reducer:gameSessionCheckThunk.fulfilled]', {
            status,
            reason,
            action,
            // Game...
            currentQuestionIdx,
          });
          // debugger;
          // Update game...
          state.currentQuestionIdx = currentQuestionIdx;
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
          console.error('[features/GameSession/reducer:gameSessionCheckThunk.rejected]', {
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
      // gameSessionStop...
      .addCase(String(gameSessionStopThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionStopThunk.fulfilled),
        (state: TGameSessionState, _action: TGameSessionStopPayloadAction) => {
          // const { status, reason } = action.payload;
          /* console.log('[features/GameSession/reducer:gameSessionStopThunk.fulfilled]', {
           *   status,
           *   reason,
           *   action,
           * });
           */
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
        },
      )
      .addCase(
        String(gameSessionStopThunk.rejected),
        (state: TGameSessionState, action: TGameSessionStopPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameSession/reducer:gameSessionStopThunk.rejected]', {
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
      // gameSessionSendAnswer...
      .addCase(String(gameSessionSendAnswerThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionSendAnswerThunk.fulfilled),
        (state: TGameSessionState, action: TGameSessionSendAnswerPayloadAction) => {
          const { status, reason, isCorrect } = action.payload;
          console.log('[features/GameSession/reducer:gameSessionSendAnswerThunk.fulfilled]', {
            isCorrect,
            status,
            reason,
            action,
          });
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
          console.error('[features/GameSession/reducer:gameSessionSendAnswerThunk.rejected]', {
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

  selectCurrentQuestionIdx: (state: TGameSessionState): TGameSessionState['currentQuestionIdx'] =>
    state.currentQuestionIdx,
  selectCurrentAnswerIdx: (state: TGameSessionState): TGameSessionState['currentAnswerIdx'] =>
    state.currentAnswerIdx,
  selectCurrentAnswerIsCorrect: (
    state: TGameSessionState,
  ): TGameSessionState['currentAnswerIsCorrect'] => state.currentAnswerIsCorrect,

  // Basic...
  selectIsPlaying: (state: TGameSessionState): TGameSessionState['isPlaying'] => state.isPlaying,
  selectIsFinished: (state: TGameSessionState): TGameSessionState['isFinished'] => state.isFinished,
};

// Actions...
export const actions = gameSessionSlice.actions;

// Core reducer...
export const reducer = gameSessionSlice.reducer;
