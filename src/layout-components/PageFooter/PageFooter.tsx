/** @module PageFooter
 *  @since 2023.01.27, 16:20
 *  @changed 2023.01.27, 16:20
 */

import React from 'react';
import classnames from 'classnames';

import { Panel } from '@/ui-elements';

import styles from './PageFooter.module.scss';

interface TPageFooterProps {
  className?: string;
}

export default function PageFooter(props: TPageFooterProps): JSX.Element {
  const { className } = props;
  return <Panel className={classnames(className, styles.container)} tag="footer" flex />;
}
