/** @module reducer
 *  @since 2023.02.11, 17:02
 *  @changed 2023.02.11, 17:06
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameSessionState } from './types';
import { defaultState } from './constants';
import { fetchStartWaitingThunk, TFetchStartWaitingResult } from './services/fetchStartWaiting';

type TFetchAppInfoPayloadAction = PayloadAction<TFetchStartWaitingResult, string, unknown, Error>;

const initialState: TGameSessionState = {
  ...defaultState,
};

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    resetData: (state) => {
      state.error = undefined;
      // TODO: To reset `userName`, `token`?
    },
    setToken: (state, action: PayloadAction<TGameSessionState['token']>) => {
      state.token = action.payload;
    },
    setIsWaiting: (state, action: PayloadAction<TGameSessionState['isWaiting']>) => {
      state.isWaiting = action.payload;
    },
    setIsStarted: (state, action: PayloadAction<TGameSessionState['isStarted']>) => {
      state.isStarted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        String(fetchStartWaitingThunk.pending),
        (state: TGameSessionState, _action: TFetchAppInfoPayloadAction) => {
          state.isLoading = true;
          state.isWaiting = true;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.fulfilled),
        (state: TGameSessionState, action: TFetchAppInfoPayloadAction) => {
          const { payload } = action;
          const { token } = payload;
          /* console.log('[features/GameSession/reducer:fetchStartWaitingThunk.fulfilled]: success', {
           *   token,
           *   payload,
           * });
           */
          state.token = token;
          state.isLoading = false;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchStartWaitingThunk.rejected),
        (state: TGameSessionState, action: TFetchAppInfoPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.log('[features/GameSession/reducer:fetchStartWaitingThunk.rejected]', {
            error,
            meta,
          });
          // debugger; // eslint-disable-line no-debugger
          state.error = error;
          state.isLoading = false;
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
  selectToken: (state: TGameSessionState): TGameSessionState['token'] => state.token,
  selectIsWaiting: (state: TGameSessionState): TGameSessionState['isWaiting'] => state.isWaiting,
  selectIsStarted: (state: TGameSessionState): TGameSessionState['isStarted'] => state.isStarted,
};

// Actions (TODO, SAMPLE)...
export const actions = gameSessionSlice.actions;

// Core reducer...
export const reducer = gameSessionSlice.reducer;
