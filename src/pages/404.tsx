/** @module NotFoundPage
 *  @since 2022.02.08, 22:28
 *  @changed 2023.01.31, 22:47
 */

// TODO 2022.02.09, 21:51 -- Use `_error` page? See `https://nextjs.org/docs/advanced-features/custom-error-page`.

import React from 'react';

import * as siteConfig from '@/config/site';
import GenericPageLayout from '@/layout/GenericPageLayout';
import { subPageTitle } from '@/ui-support/pageUtils';
import NotFoundSection from '@/components/Common/NotFound/Section';

export default function NotFoundPage(): JSX.Element {
  const pageTitle = siteConfig.notFoundTitle;
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      <NotFoundSection />
    </GenericPageLayout>
  );
}
