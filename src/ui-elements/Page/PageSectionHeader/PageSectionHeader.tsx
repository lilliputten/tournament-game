/** @module PageSectionHeader
 *  @since 2023.02.01, 18:01
 *  @changed 2023.02.01, 18:19
 */

import React from 'react';
import classnames from 'classnames';

import { TReactContent } from '@/utils/react-types';

import styles from './PageSectionHeader.module.scss';

export interface TPageSectionHeaderProps {
  title?: TReactContent;
  description?: TReactContent;
  children?: TReactContent;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  padded?: boolean;
}

export function PageSectionHeader(props: TPageSectionHeaderProps): JSX.Element {
  const { className, titleClassName, descriptionClassName, title, description, children, padded } =
    props;
  const hasDescr = !!(description || children);
  const descrContent = hasDescr && (
    <div className={classnames(descriptionClassName, styles.description)}>
      {description || children}
    </div>
  );
  return (
    <div className={classnames(className, styles.container, padded && styles.padded)}>
      <h1 className={classnames(titleClassName, styles.title)}>{title}</h1>
      {descrContent}
    </div>
  );
}
