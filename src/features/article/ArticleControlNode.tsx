/** @module ArticleControlNode
 *  @desc Bare component to control articles events on the top level of react nodes
 *  @since 2023.01.31, 21:44
 *  @changed 2023.01.31, 22:13
 */

import { useEffect, useMemo } from 'react';
import { useStore } from 'react-redux';

import { useAppDispatch } from '@/core/app/app-store';
import { RootState, useCurrentArticleId } from '@/core/app/app-reducer';
import { defaultArticleParams } from '@/features/article/constants'; // NOTE: Temporaily trick: Avoiding cycling imports
import { TArticleParams, fetchArticleAction } from '@/features/article';
import { resetData } from '@/features/article/reducer';

type TMemo = TArticleParams;
const defaultMemo = { ...defaultArticleParams };

export function ArticleControlNode(): null {
  const dispatch = useAppDispatch();
  const appStateStore = useStore<RootState>();

  const currentArticleId = useCurrentArticleId();

  const memo = useMemo<TMemo>(() => ({ ...defaultMemo }), []);

  // Effect: Update data on essential parameters change
  useEffect(() => {
    const needReset = !currentArticleId && !!memo.id;
    // Call actions...
    if (needReset) {
      dispatch(resetData());
    }
    if (currentArticleId) {
      fetchArticleAction(appStateStore);
    }
    // Save parameters to memo
    memo.id = currentArticleId;
  }, [dispatch, appStateStore, memo, currentArticleId]);

  return null;
}
