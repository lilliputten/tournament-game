/** @module PageSectionWrapper
 *  @since 2023.02.01, 18:01
 *  @changed 2023.02.01, 18:11
 */

import React from 'react';
import classnames from 'classnames';

import { TReactContent } from '@/utils/react-types';

import styles from './PageSectionWrapper.module.scss';

interface TPageSectionWrapperProps {
  className?: string;
  wrapperClassName?: string;
  children?: TReactContent;
  flex?: boolean;
  flexVertical?: boolean;
  fullSizeFlexChild?: boolean;
  padded?: boolean;
}

export function PageSectionWrapper(props: TPageSectionWrapperProps): JSX.Element {
  const { className, wrapperClassName, children, flex, flexVertical, fullSizeFlexChild, padded } =
    props;
  return (
    <div
      className={classnames(
        className,
        styles.container,
        padded && styles.padded,
        flex && styles.flex,
        fullSizeFlexChild && styles.fullSizeFlexChild,
      )}
    >
      <div
        className={classnames(
          wrapperClassName,
          styles.wrapper,
          flex && styles.flex,
          flexVertical && styles.flexVertical,
        )}
      >
        {children}
      </div>
    </div>
  );
}
