/** @module IndexPage
 *  @since 2023.01.26, 22:51
 *  @changed 2023.02.02, 08:41
 */

import Link from 'next/link';

import GenericPageLayout from '@/layout/GenericPageLayout';
import { WrappedArticleList } from '@/components';
import { PageSectionWrapper, ArticlesListPageSectionHeader, HeaderExtraBlock } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';

// TODO 2023.01.30, 19:17 -- Use specific frontpage articles list component
// (task?). Left ArticleList for ordinary search results and bookmarked
// articles displaying.

export default function IndexPage(): JSX.Element {
  const pageTitle = 'Top stories';
  const title = subPageTitle(pageTitle);
  const description = (
    <>
      Main page has not implemented yet. Displaying{' '}
      <Link href="/articles">articles list component</Link> instead.
    </>
  );
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
