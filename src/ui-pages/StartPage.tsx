/** @module StartPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.15, 21:15
 */

import React from 'react';

import { useAppDispatch } from '@/core/app/app-store';
import { useRootStore } from '@/core/app/app-root-state';

import { fetchAppInfoAction } from '@/features/GameParams/services';
// import { actions } from '@/features/GameParams/reducer';

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { WrappedStartBlock } from '@/ui-blocks/StartBlock';
import { useGameParamsHasStarted, useGameParamsIsLoading, useGameParamsToken } from '@/core';

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Стартовая страница';
  const title = subPageTitle(pageTitle);

  const dispatch = useAppDispatch();
  const appRootStore = useRootStore();

  const token = useGameParamsToken();
  const isLoading = useGameParamsIsLoading();
  const hasStarted = useGameParamsHasStarted();

  // Effect: Update data on essential parameters change
  React.useEffect(() => {
    // If started but token hasn't received...
    if (!token && !isLoading && hasStarted) {
      // ...try to fetch it again...
      fetchAppInfoAction(appRootStore);
    }
  }, [dispatch, appRootStore, isLoading, hasStarted, token]);

  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <WrappedStartBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
