/** @module reducer
 *  @since 2023.01.28, 19:17
 *  @changed 2023.02.10, 18:26
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGameMode, TGameParamsState } from './types';
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
    setUserName: (state, action: PayloadAction<string>) => {
      const userName = action.payload;
      state.userName = userName;
      hasLocalStorage && localStorage.setItem('gameParams:userName', userName);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setGameMode: (state, action: PayloadAction<TGameMode>) => {
      state.gameMode = action.payload;
    },
    resetData: (state) => {
      state.error = undefined;
      // TODO: To reset `userName`, `token`?
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
          console.log('[features/GameParams/reducer:fetchAppInfoThunk.rejected]', {
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

// See reducers creation in `src/app/app-reducer.ts`
export const selectLoading = (state: TGameParamsState): TGameParamsState['isLoading'] =>
  state.isLoading;
export const selectError = (state: TGameParamsState): TGameParamsState['error'] => state.error;
export const selectToken = (state: TGameParamsState): TGameParamsState['token'] => state.token;
export const selectUserName = (state: TGameParamsState): TGameParamsState['userName'] =>
  state.userName;
export const selectGameMode = (state: TGameParamsState): TGameParamsState['gameMode'] =>
  state.gameMode;

export const { setUserName, setToken, setGameMode, resetData } = gameParamsSlice.actions;

export const reducer = gameParamsSlice.reducer;
