/** @module GenericPageLayout
 *  @desc Renders parameters for `head` page part (title, meta-data, etc).
 *  @since 2023.01.26, 23:51
 *  @changed 2023.02.07, 21:49
 */

import * as React from 'react';
import classnames from 'classnames';

import { TReactContent } from '@/utils/react-types';
import { THtmlHeaderProps } from '@/layout/HtmlHeader/HtmlHeader';
import HtmlHeader from '@/layout/HtmlHeader';
import PageContent from '@/layout-components/PageContent';

import styles from './GenericPageLayout.module.scss';

export interface TGenericPageLayoutProps extends THtmlHeaderProps {
  className?: string;
  children?: TReactContent;
}

export default function GenericPageLayout(props: TGenericPageLayoutProps): JSX.Element {
  // NOTE: Get props from nextjs (as `pageProps`)
  const { className, children, ...restProps } = props;
  // prettier-ignore
  return (
    <div className={classnames(className, styles.container)}>
      <HtmlHeader {...restProps} />
      <PageContent className={styles.content}>
        {children}
      </PageContent>
    </div>
  );
}
