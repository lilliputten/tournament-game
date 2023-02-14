/** @module WrappedGamePlaying
 *  @since 2023.02.14, 14:52
 *  @changed 2023.02.14, 17:34
 */

import React from 'react';
import { compose } from 'redux';

import { withGameSessionWrapperFabric } from '@/ui-blocks/withGameSessionWrapper';

import { GamePlaying, TGamePlayingProps } from './GamePlaying';

import styles from './WrappedGamePlaying.module.scss';

// Export wrapped version
export const WrappedGamePlaying = compose<React.FC<TGamePlayingProps>>(
  withGameSessionWrapperFabric<TGamePlayingProps>({
    errorClassName: styles.error,
    wrapperClassName: styles.wrapper,
  }),
)(GamePlaying);
