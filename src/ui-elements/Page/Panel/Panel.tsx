/** @module Panel
 *  @since 2023.01.27, 16:47
 *  @changed 2023.01.27, 19:24
 */

import React from 'react';
import classnames from 'classnames';

import { TReactContent } from '@/utils/react-types';

import styles from './Panel.module.scss';

interface TPanelProps {
  tag?: string;
  className?: string;
  wrapperClassName?: string;
  children?: TReactContent;
  flex?: boolean;
  flexVertical?: boolean;
  padded?: boolean;
}

export function Panel(props: TPanelProps): JSX.Element {
  const { tag = 'div', className, wrapperClassName, children, flex, flexVertical, padded } = props;
  const renderProps = {
    className: classnames(className, styles.container, padded && styles.padded),
  };
  const renderContent = (
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
  );
  return React.createElement(tag, renderProps, renderContent);
}
