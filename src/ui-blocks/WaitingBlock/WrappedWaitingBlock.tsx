/** @module WrappedWaitingBlock
 *  @since 2023.02.10, 20:31
 *  @changed 2023.02.10, 20:31
 */

import React from 'react';
import { compose } from 'redux';

import { withGameParamsWrapperFabric } from '@/ui-blocks/withGameParamsWrapper';

import { WaitingBlock, TWaitingBlockProps } from './WaitingBlock';

import styles from './WrappedWaitingBlock.module.scss';

// Export wrapped version
export const WrappedWaitingBlock = compose<React.FC<TWaitingBlockProps>>(
  withGameParamsWrapperFabric<TWaitingBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(WaitingBlock);
