/** @module withRecordsTableWrapper
 *  @desc Wrapping any component (with RecordsTableWrapper)
 *  @since 2023.03.19, 02:08
 *  @changed 2023.03.19, 02:08
 */

import React from 'react';
import { Typography } from '@mui/material';
import classnames from 'classnames';

import { toast } from '@/ui-elements';
import { errorToString } from '@/utils';
import { useRecordsTableIsLoading, useRecordsTableError } from '@/core/app/app-reducer';
import { LoaderSplash } from '@/ui-elements';

import styles from './RecordsTableWrapper.module.scss';

export interface TWithRecordsTableWrapperParams {
  wrapperClassName?: string;
  contentClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithRecordsTableWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
}

export function withRecordsTableWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithRecordsTableWrapperParams,
): (
  Component: React.ComponentType<P & TWithRecordsTableWrapperProps>,
) => (props: P) => JSX.Element {
  const { wrapperClassName, contentClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withRecordsTableWrapper<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function RecordsTableWrapper(props: P) {
      const isLoading = useRecordsTableIsLoading();
      const error = useRecordsTableError();
      // Effect: Show error toast
      React.useEffect(() => {
        error && toast.error(errorToString(error));
      }, [error]);
      return (
        <div className={classnames(wrapperClassName, styles.container)}>
          {/* Show error */}
          {showErrorInWrapper && error && (
            <Typography className={classnames(errorClassName, styles.contentError)}>
              {errorToString(error)}
            </Typography>
          )}
          <div className={classnames(contentClassName, styles.contentContainer)}>
            <Component {...props} error={error} isLoading={isLoading} />
          </div>
          {/* Show small loader at the end of article items if some data has loaded
          {isLoading && (
            <LoaderSplash
              className={styles.smallLoader}
              spinnerSize="medium"
              show // Without animations!
            />
          )}
          */}
          {/* Show large covering loader splash if no data loaded */}
          <LoaderSplash
            className={styles.loaderSplash}
            show={isLoading}
            spinnerSize="large"
            bg="white"
            mode="cover"
            fullSize
          />
        </div>
      );
    };
  };
}
