/** @module WaitingPage
 *  @since 2023.02.11, 14:23
 *  @changed 2023.02.11, 14:23
 */

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { WaitingBlock } from '@/ui-blocks/WaitingBlock';

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Старт игры';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <WaitingBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
