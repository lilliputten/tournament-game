/** @module WrappedGameBlock
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.15, 16:04
 */

import React from 'react';
import { compose } from 'redux';

import { withGamePlayingWrapperFabric } from '@/ui-blocks/withGamePlayingWrapper';

import { GameBlock, TGameBlockProps } from './GameBlock';

import styles from './WrappedGameBlock.module.scss';

// Export wrapped version
export const WrappedGameBlock = compose<React.FC<TGameBlockProps>>(
  withGamePlayingWrapperFabric<TGameBlockProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(GameBlock);
