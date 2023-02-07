/** @module ArticlesListPageSectionHeader
 *  @since 2023.02.02, 06:10
 *  @changed 2023.02.02, 06:10
 */

import React from 'react';
import classnames from 'classnames';

import { TReactContent } from '@/utils/react-types';
import { PageSectionHeader, TPageSectionHeaderProps } from '../PageSectionHeader';

import styles from './ArticlesListPageSectionHeader.module.scss';

interface TArticlesListPageSectionHeaderProps extends TPageSectionHeaderProps {
  extraBlock?: TReactContent;
  className?: string;
  wrapperClassName?: string;
  padded?: boolean;
}

export function ArticlesListPageSectionHeader(
  props: TArticlesListPageSectionHeaderProps,
): JSX.Element {
  const { className, wrapperClassName, extraBlock, padded, ...restProps } = props;
  const hasExtra = !!extraBlock;
  return (
    <div className={classnames(className, styles.container, padded && styles.padded)}>
      <div className={classnames(wrapperClassName, styles.wrapper)}>
        <div className={classnames(styles.headerBlock)}>
          <PageSectionHeader {...restProps} />
        </div>
        {hasExtra && <div className={classnames(styles.extraBlock)}>{extraBlock}</div>}
      </div>
    </div>
  );
}
