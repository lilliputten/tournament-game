/** @module StartPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.02, 08:41
 */

// import Link from 'next/link';

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { StartBlock } from '@/ui-blocks/StartBlock/StartBlock';

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Top stories';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <StartBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
