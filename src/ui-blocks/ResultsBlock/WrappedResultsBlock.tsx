/** @module WrappedResultsBlock
 *  @since 2023.02.17, 05:07
 *  @changed 2023.02.17, 05:07
 */

import React from 'react';
import { compose } from 'redux';

import { withGameWaitingWrapperFabric } from '@/ui-blocks/withGameWaitingWrapper';

import { ResultsBlock, TResultsBlockProps } from './ResultsBlock';

import styles from './WrappedResultsBlock.module.scss';

// Export wrapped version
export const WrappedResultsBlock = compose<React.FC<TResultsBlockProps>>(
  withGameWaitingWrapperFabric<TResultsBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(ResultsBlock);
