/** @module RecordsTablePage
 *  @since 2023.03.05, 03:00
 *  @changed 2023.03.05, 04:57
 */

import GenericPageLayout from '@/layout/GenericPageLayout';
import { PageSectionWrapper } from '@/ui-elements';
import { subPageTitle } from '@/ui-support/pageUtils';
import { RecordsTableBlock } from '@/ui-blocks/RecordsTableBlock';

import styles from './RecordsTablePage.module.scss';

export function RecordsTablePage(): JSX.Element {
  const pageTitle = 'Результаты';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout className={styles.root} title={title}>
      <PageSectionWrapper flex flexVertical fullSizeFlexChild flexCenter>
        <RecordsTableBlock />
      </PageSectionWrapper>
    </GenericPageLayout>
  );
}
