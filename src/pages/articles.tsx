/** @module ArticlesListPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.02, 08:42
 */

import GenericPageLayout from '@/layout/GenericPageLayout';
import { WrappedArticleList } from '@/components';
import { PageSectionWrapper, ArticlesListPageSectionHeader, HeaderExtraBlock } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';

export default function ArticlesListPage(): JSX.Element {
  const pageTitle = 'Search';
  const title = subPageTitle(pageTitle);
  const description = 'Page search component.';
  const extraBlock = <HeaderExtraBlock />;
  return (
    <GenericPageLayout title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild>
        <ArticlesListPageSectionHeader
          title={pageTitle}
          description={description}
          extraBlock={extraBlock}
          padded
        />
        <WrappedArticleList />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
