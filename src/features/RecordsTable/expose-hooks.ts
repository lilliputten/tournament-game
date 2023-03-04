/** @module expose-hooks
 *  @since 2023.03.05, 04:16
 *  @changed 2023.03.05, 05:07
 */

import { TRootState, useTypedSelector } from '@/core/app/app-root-state';

import { TRecordsTableState } from './types';
import { selectors } from './reducer';

// RecordsTable reducers (see `TRootState` at `src/core/app/app-root-state.ts`)...
export const selectRecordsTableState = (state: TRootState): TRecordsTableState =>
  state.resultsTable;
export const useRecordsTableState = (): TRecordsTableState =>
  useTypedSelector((state) => selectRecordsTableState(state));

// Basic (common) hooks...
export const useRecordsTableIsLoading = (): ReturnType<typeof selectors.selectIsLoading> =>
  selectors.selectIsLoading(useRecordsTableState());
export const useRecordsTableError = (): ReturnType<typeof selectors.selectError> =>
  selectors.selectError(useRecordsTableState());

// Custom hooks
export const useRecordsTable = (): ReturnType<typeof selectors.selectRecordsTable> =>
  selectors.selectRecordsTable(useRecordsTableState());
