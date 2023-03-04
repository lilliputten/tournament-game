/** @module constants
 *  @since 2023.03.05, 04:16
 *  @changed 2023.03.05, 05:07
 */

import { TRecordsTableState } from './types';

// Default state
export const defaultState: TRecordsTableState = {
  resultsTable: undefined,

  // State...
  loadingCount: 0,
  isLoading: false,
  error: undefined,
};
