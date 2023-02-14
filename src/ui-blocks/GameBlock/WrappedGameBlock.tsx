/** @module WrappedGameBlock
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.14, 17:34
 */

import React from 'react';
import { compose } from 'redux';

import { withGameSessionWrapperFabric } from '@/ui-blocks/withGameSessionWrapper';

import { GameBlock, TGameBlockProps } from './GameBlock';

import styles from './WrappedGameBlock.module.scss';

// Export wrapped version
export const WrappedGameBlock = compose<React.FC<TGameBlockProps>>(
  withGameSessionWrapperFabric<TGameBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(GameBlock);
