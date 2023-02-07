/** @module ViewArticlePage
 *  @since 2023.01.31, 17:18
 *  @changed 2023.02.02, 05:39
 */

import { useCurrentArticleTitle } from '@/core/app/app-reducer';
import GenericPageLayout from '@/layout/GenericPageLayout';
import { WrappedArticleViewById } from '@/components';
import { subPageTitle } from '@/ui-support/pageUtils';
import { TWithRouterProps, withRouterProps } from '@/ui-elements';

function ViewArticlePage(props: TWithRouterProps): JSX.Element {
  const { routerQuery } = props;
  let { id } = routerQuery;
  if (Array.isArray(id)) {
    id = id.join(',');
  }
  const pageTitle = useCurrentArticleTitle();
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <WrappedArticleViewById id={id || undefined} />
    </GenericPageLayout>
  );
}

export default withRouterProps(ViewArticlePage);
