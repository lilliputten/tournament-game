/** @module reducer
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.15, 20:59
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
      state.isGameStarted = false;
      state.isWaiting = false;
      state.isWaitingCycle = false;
    },
    setIsWaiting: (state, action: PayloadAction<TGameWaitingState['isWaiting']>) => {
      state.isWaiting = action.payload;
    },
    setIsWaitingCycle: (state, action: PayloadAction<TGameWaitingState['isWaitingCycle']>) => {
      state.isWaitingCycle = action.payload;
    },
    setIsGameStarted: (state, action: PayloadAction<TGameWaitingState['isGameStarted']>) => {
      state.isGameStarted = action.payload;
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
          state.isGameStarted = false;
          state.isWaiting = true;
          state.isWaitingCycle = false;
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.fulfilled),
        (state: TGameWaitingState, action: TFetchStartWaitingPayloadAction) => {
          const {
            // Base...
            // reason,
            status,
            // Game...
            gameMode,
            gameToken,
            partnerName,
            partnerToken,
          } = action.payload;
          /* console.log('[features/GameWaiting/reducer:fetchStartWaitingThunk.fulfilled]: success', {
           *   // Base...
           *   // reason,
           *   status,
           *   // Game...
           *   gameMode,
           *   gameToken,
           *   partnerName,
           *   partnerToken,
           *   // Payload...
           *   payload: action.payload,
           * });
           */
          // Update game status (for information only)...
          state.gameMode = gameMode;
          state.gameToken = gameToken;
          state.partnerName = partnerName;
          state.partnerToken = partnerToken;
          // Set next status...
          // state.isWaitingCycle = true; // Start wating cycle
          if (status === 'waiting') {
            state.isWaitingCycle = true; // Start wating cycle
          } else if (status === 'waitingFinished') {
            state.isGameStarted = true;
          }
          // Request...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
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
          state.isGameStarted = false;
          state.isWaiting = false;
          state.isWaitingCycle = false;
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
        state.error = undefined;
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
      )
      // fetchCheckWaiting...
      .addCase(String(fetchCheckWaitingThunk.pending), (state: TGameWaitingState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(fetchCheckWaitingThunk.fulfilled),
        (state: TGameWaitingState, action: TFetchCheckWaitingPayloadAction) => {
          const {
            // Base...
            status,
            // reason,
            // // Game...
            gameMode,
            gameToken,
            partnerName,
            partnerToken,
          } = action.payload;
          /* console.log('[features/GameWaiting/reducer:fetchCheckWaitingThunk.fulfilled]', {
           *   // Base...
           *   status,
           *   // reason,
           *   // // Game...
           *   gameMode,
           *   gameToken,
           *   partnerName,
           *   partnerToken,
           *   // Payload...
           *   payload: action.payload,
           * });
           */
          if (status !== 'waiting') {
            /* // DEBUG
             * // prettier-ignore
             * console.log('[features/GameWaiting/reducer:fetchCheckWaitingThunk.fulfilled]: not waiting');
             */
            // Update game status (for information only)...
            state.gameMode = gameMode;
            state.gameToken = gameToken;
            state.partnerName = partnerName;
            state.partnerToken = partnerToken;
            // Stop waiting loop...
            state.isWaiting = false;
            state.isWaitingCycle = false;
            if (status === 'waitingFinished') {
              state.isGameStarted = true;
            } else if (status === 'failed') {
              state.isFailed = true;
            }
          }
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
          state.error = undefined;
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
      );
  },
});

// Exports (see reducers creation in `src/app/app-reducer.ts`)...

// Export selecors...
export const selectors = {
  // Basic (common) selectors...
  selectLoading: (state: TGameWaitingState): TGameWaitingState['isLoading'] => state.isLoading,
  selectError: (state: TGameWaitingState): TGameWaitingState['error'] => state.error,

  // Custom selectors...
  selectIsWaiting: (state: TGameWaitingState): TGameWaitingState['isWaiting'] => state.isWaiting,
  selectIsWaitingCycle: (state: TGameWaitingState): TGameWaitingState['isWaitingCycle'] =>
    state.isWaitingCycle,
  selectIsGameStarted: (state: TGameWaitingState): TGameWaitingState['isGameStarted'] =>
    state.isGameStarted,
  selectIsFailed: (state: TGameWaitingState): TGameWaitingState['isFailed'] => state.isFailed,

  // Game...
  selectGameMode: (state: TGameWaitingState): TGameWaitingState['gameMode'] => state.gameMode,
  selectGameToken: (state: TGameWaitingState): TGameWaitingState['gameToken'] => state.gameToken,
  selectPartnerName: (state: TGameWaitingState): TGameWaitingState['partnerName'] =>
    state.partnerName,
  selectPartnerToken: (state: TGameWaitingState): TGameWaitingState['partnerToken'] =>
    state.partnerToken,
};

// Actions...
export const actions = gameWaitingSlice.actions;

// Core reducer...
export const reducer = gameWaitingSlice.reducer;
