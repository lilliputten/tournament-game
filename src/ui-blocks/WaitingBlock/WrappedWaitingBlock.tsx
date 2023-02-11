/** @module WrappedWaitingBlock
 *  @since 2023.02.10, 20:31
 *  @changed 2023.02.10, 20:31
 */

import React from 'react';
import { compose } from 'redux';

import { withGameSessionWrapperFabric } from '@/ui-blocks/withGameSessionWrapper';

import { WaitingBlock, TWaitingBlockProps } from './WaitingBlock';

import styles from './WrappedWaitingBlock.module.scss';

// Export wrapped version
export const WrappedWaitingBlock = compose<React.FC<TWaitingBlockProps>>(
  withGameSessionWrapperFabric<TWaitingBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(WaitingBlock);
