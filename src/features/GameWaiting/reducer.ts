/** @module reducer
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.13, 01:02
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameWaitingState } from './types';
import { defaultState } from './constants';
import {
  fetchCheckWaitingThunk,
  fetchStartWaitingThunk,
  sendStopWaitingThunk,
  TFetchCheckWaitingPayloadAction,
  TFetchStartWaitingPayloadAction,
  TSendStopWaitingPayloadAction,
} from './services';

const initialState: TGameWaitingState = {
  ...defaultState,
};

const gameWaitingSlice = createSlice({
  name: 'gameWaiting',
  initialState,
  reducers: {
    resetData: (state) => {
      state.error = undefined;
      state.isLoading = false;
      state.isStarted = false;
      state.isWaiting = false;
      state.isWaitingCycle = false;
    },
    setIsWaiting: (state, action: PayloadAction<TGameWaitingState['isWaiting']>) => {
      state.isWaiting = action.payload;
    },
    setIsWaitingCycle: (state, action: PayloadAction<TGameWaitingState['isWaitingCycle']>) => {
      state.isWaitingCycle = action.payload;
    },
    setIsStarted: (state, action: PayloadAction<TGameWaitingState['isStarted']>) => {
      state.isStarted = action.payload;
    },
    setIsFailed: (state, action: PayloadAction<TGameWaitingState['isFailed']>) => {
      state.isFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchStartWaiting...
      .addCase(
        String(fetchStartWaitingThunk.pending),
        (state: TGameWaitingState, _action: TFetchStartWaitingPayloadAction) => {
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
        (state: TGameWaitingState, _action: TFetchStartWaitingPayloadAction) => {
          // console.log('[features/GameWaiting/reducer:fetchStartWaitingThunk.fulfilled]: success', action.payload);
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
          state.isWaitingCycle = true; // Start wating cycle///
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.rejected),
        (state: TGameWaitingState, action: TFetchStartWaitingPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameWaiting/reducer:fetchStartWaitingThunk.rejected]', {
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
      .addCase(String(fetchCheckWaitingThunk.pending), (state: TGameWaitingState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(fetchCheckWaitingThunk.fulfilled),
        (state: TGameWaitingState, action: TFetchCheckWaitingPayloadAction) => {
          const { status, reason } = action.payload;
          console.log('[features/GameWaiting/reducer:fetchCheckWaitingThunk.fulfilled]', {
            status,
            reason,
            action,
          });
          if (status !== 'waiting') {
            // prettier-ignore
            console.log('[features/GameWaiting/reducer:fetchCheckWaitingThunk.fulfilled]: not waiting');
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
        (state: TGameWaitingState, action: TFetchCheckWaitingPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameWaiting/reducer:fetchCheckWaitingThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          // NOTE: Cycle stops in `GameWaiting/expose-control-node`
        },
      )
      // sendStopWaiting...
      .addCase(String(sendStopWaitingThunk.pending), (state: TGameWaitingState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(String(sendStopWaitingThunk.fulfilled), (state: TGameWaitingState) => {
        state.loadingCount--;
        state.isLoading = !!state.loadingCount;
      })
      .addCase(
        String(sendStopWaitingThunk.rejected),
        (state: TGameWaitingState, action: TSendStopWaitingPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameWaiting/reducer:sendStopWaitingThunk.rejected]', {
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
  selectLoading: (state: TGameWaitingState): TGameWaitingState['isLoading'] => state.isLoading,
  selectError: (state: TGameWaitingState): TGameWaitingState['error'] => state.error,

  // Custom selectors (TODO, SAMPLE)...
  selectIsWaiting: (state: TGameWaitingState): TGameWaitingState['isWaiting'] => state.isWaiting,
  selectIsWaitingCycle: (state: TGameWaitingState): TGameWaitingState['isWaitingCycle'] =>
    state.isWaitingCycle,
  selectIsStarted: (state: TGameWaitingState): TGameWaitingState['isStarted'] => state.isStarted,
  selectIsFailed: (state: TGameWaitingState): TGameWaitingState['isFailed'] => state.isFailed,
};

// Actions (TODO, SAMPLE)...
export const actions = gameWaitingSlice.actions;

// Core reducer...
export const reducer = gameWaitingSlice.reducer;
