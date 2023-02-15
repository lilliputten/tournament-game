/** @module reducer
 *  @since 2023.02.15, 02:53
 *  @changed 2023.02.15, 16:38
 */

import { createSlice } from '@reduxjs/toolkit';

import { TQuestionsState } from './types';
import { defaultState } from './constants';
import { TLoadQuestionsPayloadAction, loadQuestionsThunk } from './services';

const initialState: TQuestionsState = {
  ...defaultState,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    resetData: (state) => {
      // Generic state...
      state.error = undefined;
      // Questions state...
      state.questions = undefined;
    },
  },
  // TODO: Thunk reducers...
  extraReducers: (builder) => {
    builder
      // loadQuestions...
      .addCase(String(loadQuestionsThunk.pending), (state: TQuestionsState) => {
        state.loadingCount++;
        state.isLoading = true;
      })
      .addCase(
        String(loadQuestionsThunk.fulfilled),
        (state: TQuestionsState, action: TLoadQuestionsPayloadAction) => {
          const {
            // reason,
            questions,
          } = action.payload;
          /* console.log('[features/Questions/reducer:loadQuestionsThunk.fulfilled]', {
           *   // reason,
           *   action,
           *   questions,
           * });
           */
          // Questions params...
          state.questions = questions;
          // Basic state...
          state.loadingCount--;
          state.isLoading = !!state.loadingCount;
        },
      )
      .addCase(
        String(loadQuestionsThunk.rejected),
        (state: TQuestionsState, action: TLoadQuestionsPayloadAction) => {
          const { error, meta } = action;
          // eslint-disable-next-line no-console
          console.error('[features/Questions/reducer:loadQuestionsThunk.rejected]', {
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
  selectIsLoading: (state: TQuestionsState): TQuestionsState['isLoading'] => state.isLoading,
  selectError: (state: TQuestionsState): TQuestionsState['error'] => state.error,

  // Custom selectors...
  selectQuestions: (state: TQuestionsState): TQuestionsState['questions'] => state.questions,
};

// Actions...
export const actions = questionsSlice.actions;

// Core reducer...
export const reducer = questionsSlice.reducer;
