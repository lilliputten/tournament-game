/** @module WrappedWaitingBlock
 *  @since 2023.02.10, 20:31
 *  @changed 2023.02.10, 20:31
 */

import React from 'react';
import { compose } from 'redux';

import { withGameWaitingWrapperFabric } from '@/ui-blocks/withGameWaitingWrapper';

import { WaitingBlock, TWaitingBlockProps } from './WaitingBlock';

import styles from './WrappedWaitingBlock.module.scss';

// Export wrapped version
export const WrappedWaitingBlock = compose<React.FC<TWaitingBlockProps>>(
  withGameWaitingWrapperFabric<TWaitingBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(WaitingBlock);
