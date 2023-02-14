/** @module GamePage
 *  @since 2023.02.14, 14:50
 *  @changed 2023.02.14, 14:50
 */

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { WrappedGameBlock } from '@/ui-blocks/GameBlock';

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Игра';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <WrappedGameBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
