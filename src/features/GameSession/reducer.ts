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
      state.partnerToken = undefined;
      state.partnerName = undefined;
    },
    setIsPlaying: (state, action: PayloadAction<TGameSessionState['isPlaying']>) => {
      state.isPlaying = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<TGameSessionState['isFinished']>) => {
      state.isFinished = action.payload;
    },
    setGameToken: (state, action: PayloadAction<TGameSessionState['gameToken']>) => {
      state.gameToken = action.payload;
    },
    setPartnerToken: (state, action: PayloadAction<TGameSessionState['partnerToken']>) => {
      state.partnerToken = action.payload;
    },
    setPartnerName: (state, action: PayloadAction<TGameSessionState['partnerName']>) => {
      state.partnerName = action.payload;
    },
  },
  // TODO: Thunk reducers...
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
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(gameSessionCheckThunk.fulfilled),
        (state: TGameSessionState, _action: TGameSessionCheckPayloadAction) => {
          // const { status, reason } = action.payload;
          /* console.log('[features/GameSession/reducer:gameSessionCheckThunk.fulfilled]', {
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
      );
  },
});

// Exports (see reducers creation in `src/app/app-reducer.ts`)...

// Export selecors...
export const selectors = {
  // Basic (common) selectors...
  selectIsLoading: (state: TGameSessionState): TGameSessionState['isLoading'] => state.isLoading,
  selectError: (state: TGameSessionState): TGameSessionState['error'] => state.error,

  // Custom selectors...
  selectGameToken: (state: TGameSessionState): TGameSessionState['gameToken'] => state.gameToken,
  selectPartnerToken: (state: TGameSessionState): TGameSessionState['partnerToken'] =>
    state.partnerToken,
  selectPartnerName: (state: TGameSessionState): TGameSessionState['partnerName'] =>
    state.partnerName,
  selectIsPlaying: (state: TGameSessionState): TGameSessionState['isPlaying'] => state.isPlaying,
  selectIsFinished: (state: TGameSessionState): TGameSessionState['isFinished'] => state.isFinished,
};

// Actions...
export const actions = gameSessionSlice.actions;

// Core reducer...
export const reducer = gameSessionSlice.reducer;
