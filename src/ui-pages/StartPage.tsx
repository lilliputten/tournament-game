/** @module StartPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.16, 01:29
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { useRootStore } from '@/core/app/app-root-state';

import { fetchAppInfoAction } from '@/features/GameParams/services';
import { actions as gameSessionActions } from '@/features/GameSession/reducer';
import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { WrappedStartBlock } from '@/ui-blocks/StartBlock';
import { useGameParamsHasStarted, useGameParamsToken } from '@/core';

export default function StartPage(): JSX.Element {
  const pageTitle = 'Стартовая страница';
  const title = subPageTitle(pageTitle);

  const dispatch = useAppDispatch();
  const appRootStore = useRootStore();

  const token = useGameParamsToken();
  const hasStarted = useGameParamsHasStarted();

  // Effect: Reset game session data...
  React.useEffect(() => {
    dispatch(gameSessionActions.resetData());
  }, [dispatch]);

  // Effect: Update data on essential parameters change
  React.useEffect(() => {
    // If started (`hasStarted` is 'memoized') but token hasn't received...
    if (!token && hasStarted) {
      // ...try to fetch it again...
      fetchAppInfoAction(appRootStore);
    }
    // NOTE: Treating `hasStarted` as 'memoized': not using in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    appRootStore,
    // hasStarted,
    token,
  ]);

  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <WrappedStartBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
