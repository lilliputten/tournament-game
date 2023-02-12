/** @module reducer
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 01:02
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameSessionState } from './types';
import { defaultState } from './constants';
import {
  fetchCheckWaitingThunk,
  fetchStartWaitingThunk,
  sendStopWaitingThunk,
  TFetchCheckWaitingPayloadAction,
  TFetchStartWaitingPayloadAction,
  TSendStopWaitingPayloadAction,
} from './services';

const initialState: TGameSessionState = {
  ...defaultState,
};

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    resetData: (state) => {
      state.error = undefined;
      state.isLoading = false;
      state.isStarted = false;
      state.isWaiting = false;
      state.isWaitingCycle = false;
    },
    setIsWaiting: (state, action: PayloadAction<TGameSessionState['isWaiting']>) => {
      state.isWaiting = action.payload;
    },
    setIsWaitingCycle: (state, action: PayloadAction<TGameSessionState['isWaitingCycle']>) => {
      state.isWaitingCycle = action.payload;
    },
    setIsStarted: (state, action: PayloadAction<TGameSessionState['isStarted']>) => {
      state.isStarted = action.payload;
    },
    setIsFailed: (state, action: PayloadAction<TGameSessionState['isFailed']>) => {
      state.isFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchStartWaiting...
      .addCase(
        String(fetchStartWaitingThunk.pending),
        (state: TGameSessionState, _action: TFetchStartWaitingPayloadAction) => {
          state.error = undefined;
          state.loadingCount++;
          state.isLoading = true;
          state.isStarted = false;
          state.isWaiting = true;
          state.isWaitingCycle = false;
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.fulfilled),
        (state: TGameSessionState, _action: TFetchStartWaitingPayloadAction) => {
          // console.log('[features/GameSession/reducer:fetchStartWaitingThunk.fulfilled]: success', action.payload);
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
          state.isWaitingCycle = true; // Start wating cycle///
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.rejected),
        (state: TGameSessionState, action: TFetchStartWaitingPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameSession/reducer:fetchStartWaitingThunk.rejected]', {
            error,
            meta,
          });
          // debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.isStarted = false;
          state.isWaiting = false;
          state.isWaitingCycle = false;
        },
      )
      // fetchCheckWaiting...
      .addCase(String(fetchCheckWaitingThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(fetchCheckWaitingThunk.fulfilled),
        (state: TGameSessionState, action: TFetchCheckWaitingPayloadAction) => {
          const { status } = action.payload;
          console.log('[features/GameSession/reducer:fetchCheckWaitingThunk.fulfilled]', {
            status,
            action,
          });
          if (status !== 'waiting') {
            console.log('[features/GameSession/reducer:fetchCheckWaitingThunk.fulfilled]: not waiting', {
              status,
            });
            debugger;
            // Stop waiting loop...
            state.isWaiting = false;
            state.isWaitingCycle = false;
            if (status === 'finished') {
              state.isStarted = true;
            } else if (status === 'failed') {
              state.isFailed = true;
            }
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
        },
      )
      .addCase(
        String(fetchCheckWaitingThunk.rejected),
        (state: TGameSessionState, action: TFetchCheckWaitingPayloadAction) => {
          const { error, meta } = action;
          // TODO: Process case when partner not found!
          // eslint-disable-next-line no-console
          console.error('[features/GameSession/reducer:fetchCheckWaitingThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // XXX: To stop cycle?
        },
      )
      // sendStopWaiting...
      .addCase(String(sendStopWaitingThunk.pending), (state: TGameSessionState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(String(sendStopWaitingThunk.fulfilled), (state: TGameSessionState) => {
        state.loadingCount--;
        state.isLoading = !!state.loadingCount;
      })
      .addCase(
        String(sendStopWaitingThunk.rejected),
        (state: TGameSessionState, action: TSendStopWaitingPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameSession/reducer:sendStopWaitingThunk.rejected]', {
            error,
            meta,
          });
          // debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
        },
      );
  },
});

// Exports (see reducers creation in `src/app/app-reducer.ts`)...

// Export selecors...
export const selectors = {
  // Basic (common) selectors...
  selectLoading: (state: TGameSessionState): TGameSessionState['isLoading'] => state.isLoading,
  selectError: (state: TGameSessionState): TGameSessionState['error'] => state.error,

  // Custom selectors (TODO, SAMPLE)...
  selectIsWaiting: (state: TGameSessionState): TGameSessionState['isWaiting'] => state.isWaiting,
  selectIsWaitingCycle: (state: TGameSessionState): TGameSessionState['isWaitingCycle'] =>
    state.isWaitingCycle,
  selectIsStarted: (state: TGameSessionState): TGameSessionState['isStarted'] => state.isStarted,
  selectIsFailed: (state: TGameSessionState): TGameSessionState['isFailed'] => state.isFailed,
};

// Actions (TODO, SAMPLE)...
export const actions = gameSessionSlice.actions;

// Core reducer...
export const reducer = gameSessionSlice.reducer;
