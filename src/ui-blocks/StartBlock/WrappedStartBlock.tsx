/** @module WrappedStartBlock
 *  @since 2023.02.10, 20:31
 *  @changed 2023.02.10, 20:31
 */

import React from 'react';
import { compose } from 'redux';

import { withGameParamsWrapperFabric } from '@/ui-blocks/withGameParamsWrapper';

import { StartBlock, TStartBlockProps } from './StartBlock';

import styles from './WrappedStartBlock.module.scss';

// Export wrapped version
export const WrappedStartBlock = compose<React.FC<TStartBlockProps>>(
  withGameParamsWrapperFabric<TStartBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(StartBlock);
