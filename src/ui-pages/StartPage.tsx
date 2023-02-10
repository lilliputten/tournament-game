/** @module StartPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.02, 08:41
 */

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { WrappedStartBlock } from '@/ui-blocks/StartBlock';

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Стартовая страница';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <WrappedStartBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
