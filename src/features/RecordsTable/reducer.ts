/** @module reducer
 *  @since 2023.03.05, 04:16
 *  @changed 2023.03.05, 05:07
 */

import { createSlice } from '@reduxjs/toolkit';

import { TRecordsTableState } from './types';
import { defaultState } from './constants';
import { TLoadRecordsTablePayloadAction, loadRecordsTableThunk } from './services';

const initialState: TRecordsTableState = {
  ...defaultState,
};

const questionsSlice = createSlice({
  name: 'resultsTable',
  initialState,
  reducers: {
    resetData: (state) => {
      // Generic state...
      state.error = undefined;
      // RecordsTable state...
      state.resultsTable = undefined;
    },
  },
  // TODO: Thunk reducers...
  extraReducers: (builder) => {
    builder
      // loadRecordsTable...
      .addCase(String(loadRecordsTableThunk.pending), (state: TRecordsTableState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(loadRecordsTableThunk.fulfilled),
        (state: TRecordsTableState, action: TLoadRecordsTablePayloadAction) => {
          const {
            // reason,
            results,
          } = action.payload;
          /* console.log('[features/RecordsTable/reducer:loadRecordsTableThunk.fulfilled]', {
           *   // reason,
           *   action,
           *   results,
           * });
           */
          // RecordsTable params...
          state.resultsTable = results;
          // Basic state...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
        },
      )
      .addCase(
        String(loadRecordsTableThunk.rejected),
        (state: TRecordsTableState, action: TLoadRecordsTablePayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/RecordsTable/reducer:loadRecordsTableThunk.rejected]', {
            error,
            meta,
          });
          debugger; // eslint-disable-line no-debugger
          // Basic state...
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
  selectIsLoading: (state: TRecordsTableState): TRecordsTableState['isLoading'] => state.isLoading,
  selectError: (state: TRecordsTableState): TRecordsTableState['error'] => state.error,

  // Custom selectors...
  selectRecordsTable: (state: TRecordsTableState): TRecordsTableState['resultsTable'] =>
    state.resultsTable,
};

// Actions...
export const actions = questionsSlice.actions;

// Core reducer...
export const reducer = questionsSlice.reducer;
