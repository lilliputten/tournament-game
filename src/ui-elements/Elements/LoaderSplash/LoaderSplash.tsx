/** @module LoaderSplash
 *  @since 2023.01.27, 21:26
 *  @changed 2023.02.15, 22:08
 */

import React from 'react';
import classnames from 'classnames';

import { Spinner, TSpinnerSize, TSpinnerColor } from '../Spinner';

import styles from './LoaderSplash.module.scss';

type TBackground = true | 'page' | 'white' | 'gray' | 'neutral' | 'primary';
type TMode = 'cover';

interface TLoaderSplashProps {
  className?: string;
  spinnerSize?: TSpinnerSize;
  spinnerColor?: TSpinnerColor;
  fullSize?: boolean;
  bg?: TBackground;
  show?: boolean;
  mode?: TMode;
}

export function LoaderSplash(props: TLoaderSplashProps): JSX.Element {
  const { className, spinnerSize, spinnerColor, fullSize, bg, show = true, mode } = props;
  const bgId = bg && ['bg', bg].filter((x) => typeof x === 'string').join('_');
  const resultedClassName = classnames(
    className,
    styles.container,
    mode && styles['mode_' + mode],
    fullSize && styles.fullSize,
    bgId && styles[bgId],
    show || styles.hidden,
  );
  return (
    <div className={resultedClassName}>
      <Spinner className={styles.spinner} size={spinnerSize} color={spinnerColor} />
    </div>
  );
}
