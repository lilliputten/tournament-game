/** @module withGameParamsWrapper
 *  @desc Wrapping any component (with GameParamsWrapper)
 *  @since 2023.02.10, 20:24
 *  @changed 2023.02.10, 20:24
 */

import React from 'react';
import classnames from 'classnames';

import { useGameParamsLoading, useGameParamsError } from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash } from '@/ui-elements';
import { Typography } from '@mui/material';

import styles from './GameParamsWrapper.module.scss';

export interface TWithGameParamsWrapperParams {
  wrapperClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithGameParamsWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
}

export function withGameParamsWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithGameParamsWrapperParams,
): (Component: React.ComponentType<P & TWithGameParamsWrapperProps>) => (props: P) => JSX.Element {
  const { wrapperClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withGameParamsWrapper<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function GameParamsWrapper(props: P) {
      const isLoading = useGameParamsLoading();
      const error = useGameParamsError();
      return (
        <div className={classnames(wrapperClassName, styles.container)}>
          {/* Show error */}
          {showErrorInWrapper && error && (
            <Typography className={classnames(errorClassName, styles.contentError)}>
              {errorToString(error)}
            </Typography>
          )}
          <div className={styles.contentContainer}>
            <Component {...props} error={error} isLoading={isLoading} />
          </div>
          {/* Show small loader at the end of article items if some data has loaded */}
          {isLoading && (
            <LoaderSplash
              className={styles.smallLoader}
              spinnerSize="medium"
              show // Without animations!
            />
          )}
          {/* Show large covering loader splash if no data loaded */}
          {/*
          <LoaderSplash
            className={styles.loaderSplash}
            show={isLoading}
            spinnerSize="large"
            bg="white"
            mode="cover"
            fullSize
          />
          */}
        </div>
      );
    };
  };
}
