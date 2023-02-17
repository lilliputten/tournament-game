/** @module gameSessionQuestionIdx
 *  @since 2023.02.13, 21:05
 *  @changed 2023.02.13, 21:05
 */

import { AnyAction, createAsyncThunk, PayloadAction, Store, ThunkDispatch } from '@reduxjs/toolkit';

import * as buildConfig from '@/config/build';
import { TRootState } from '@/core/app/app-root-state';

export type TGameSessionQuestionIdxStatus = string;

interface TResponseData {
  // Operation result...
  error?: string; // Error text (if occured)
  reason?: string; // ('Partner found, game started')
  status?: TGameSessionQuestionIdxStatus;
  success: boolean; // true

  questionIdx: number;
}
export type TGameSessionQuestionIdxResult = Pick<TResponseData, 'questionIdx'>;
export type TGameSessionQuestionIdxParams = Pick<TResponseData, 'questionIdx'>;

export type TGameSessionQuestionIdxPayloadAction = PayloadAction<
  TGameSessionQuestionIdxResult,
  string,
  unknown,
  Error
>;

const storageKey = 'GameSession:gameSessionQuestionIdx';
const hasLocalStorage = typeof localStorage !== 'undefined';

// DEBUG: Clean saved data...
const debugCleanStorageOnStart = false;
if (debugCleanStorageOnStart && buildConfig.isDev) {
  hasLocalStorage && localStorage.removeItem(storageKey);
}

export async function saveGameSessionQuestionIdx(
  params: TGameSessionQuestionIdxParams,
): Promise<TGameSessionQuestionIdxResult> {
  const { questionIdx } = params;
  hasLocalStorage && localStorage.setItem(storageKey, String(questionIdx));
  /* console.log('[saveGameSessionQuestionIdx:saveGameSessionQuestionIdx]', {
   *   questionIdx,
   * });
   */
  return Promise.resolve({ questionIdx });
}

export const saveGameSessionQuestionIdxThunk = createAsyncThunk(
  'articles/gameSessionQuestionIdxThunk',
  async (params: TGameSessionQuestionIdxParams): Promise<TGameSessionQuestionIdxResult> => {
    return await saveGameSessionQuestionIdx(params);
  },
);

export async function getGameSessionQuestionIdx(): Promise<TGameSessionQuestionIdxResult> {
  const questionIdxSrc = hasLocalStorage && localStorage.getItem(storageKey);
  const questionIdx = Number(questionIdxSrc) || 0;
  /*
   * console.log('[saveGameSessionQuestionIdx:getGameSessionQuestionIdx]', {
   *   questionIdx,
   *   questionIdxSrc,
   * });
   */
  return Promise.resolve({ questionIdx });
}

export const getGameSessionQuestionIdxThunk = createAsyncThunk(
  'articles/gameSessionQuestionIdxThunk',
  async (): Promise<TGameSessionQuestionIdxResult> => {
    return await getGameSessionQuestionIdx();
  },
);

export function saveGameSessionQuestionIdxAction(rootStore: Store<TRootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  const gameSessionState = rootStore.getState().gameSession;
  const { currentQuestionIdx: questionIdx } = gameSessionState;
  /* console.log('[saveGameSessionQuestionIdx:saveGameSessionQuestionIdxAction]: start', {
   *   questionIdx,
   * });
   */
  if (questionIdx == undefined) {
    const error = new Error('Parameter `questionIdx` is not defined');
    // eslint-disable-next-line no-console
    console.error('[fetchStartWaiting:fetchStartWaitingAction]: error', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  // Prepare parameters and start thunk...
  const params: TGameSessionQuestionIdxParams = {
    questionIdx,
  };
  thunkDispatch(saveGameSessionQuestionIdxThunk(params));
}

export function getGameSessionQuestionIdxAction(rootStore: Store<TRootState>): void {
  const thunkDispatch = rootStore.dispatch as ThunkDispatch<TRootState, void, AnyAction>;
  thunkDispatch(getGameSessionQuestionIdxThunk());
}
