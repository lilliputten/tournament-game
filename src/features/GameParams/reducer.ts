/** @module reducer
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.11, 21:36
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameParamsState } from './types';
import { defaultState } from './constants';
import { fetchAppInfoThunk, TFetchAppInfoResult } from './services/fetchAppInfo';

type TFetchAppInfoPayloadAction = PayloadAction<TFetchAppInfoResult, string, unknown, Error>;

const hasLocalStorage = typeof localStorage !== 'undefined';

const defaultUserName = (hasLocalStorage && localStorage.getItem('gameParams:userName')) || '';
const initialState: TGameParamsState = {
  ...defaultState,
  userName: defaultUserName,
};

const gameParamsSlice = createSlice({
  name: 'gameParams',
  initialState,
  reducers: {
    resetData: (state) => {
      state.error = undefined;
      // TODO: To reset `userName`, `token`, etc?
    },
    setUserName: (state, action: PayloadAction<TGameParamsState['userName']>) => {
      const userName = action.payload;
      state.userName = userName;
      hasLocalStorage && localStorage.setItem('gameParams:userName', userName || '');
      // TODO: Save name to server here?
    },
    setToken: (state, action: PayloadAction<TGameParamsState['token']>) => {
      state.token = action.payload;
    },
    setGameMode: (state, action: PayloadAction<TGameParamsState['gameMode']>) => {
      state.gameMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        String(fetchAppInfoThunk.pending),
        (state: TGameParamsState, _action: TFetchAppInfoPayloadAction) => {
          state.isLoading = true;
          state.error = undefined;
        },
      )
      .addCase(
        String(fetchAppInfoThunk.fulfilled),
        (state: TGameParamsState, action: TFetchAppInfoPayloadAction) => {
          const { payload } = action;
          const { token } = payload;
          /* console.log('[features/GameParams/reducer:fetchAppInfoThunk.fulfilled]: success', {
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
        String(fetchAppInfoThunk.rejected),
        (state: TGameParamsState, action: TFetchAppInfoPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/GameParams/reducer:fetchAppInfoThunk.rejected]', {
            error,
            meta,
          });
          // debugger; // eslint-disable-line no-debugger
          if (error.name !== 'CanceledError') {
            state.error = error;
          }
          state.isLoading = false;
        },
      );
  },
});

// Exports (see reducers creation in `src/app/app-reducer.ts`)...

// Export selecors...
export const selectors = {
  // Basic (common) selectors...
  selectLoading: (state: TGameParamsState): TGameParamsState['isLoading'] => state.isLoading,
  selectError: (state: TGameParamsState): TGameParamsState['error'] => state.error,

  // Custom selectors...
  selectToken: (state: TGameParamsState): TGameParamsState['token'] => state.token,
  selectUserName: (state: TGameParamsState): TGameParamsState['userName'] => state.userName,
  selectGameMode: (state: TGameParamsState): TGameParamsState['gameMode'] => state.gameMode,
};

// Actions...
export const actions = gameParamsSlice.actions;

// Core reducer...
export const reducer = gameParamsSlice.reducer;
