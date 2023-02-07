/** @module withArticleWrapperFabric
 *  @desc Wrapping any component (articles list with ArticleWrapper)
 *  @since 2023.01.31, 22:57
 *  @changed 2023.02.01, 20:58
 */

import React from 'react';
import classnames from 'classnames';

import { useArticleLoading, useArticleError } from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash } from '@/ui-elements';

import styles from './ArticleWrapper.module.scss';

export interface TWithArticleWrapperParams {
  wrapperClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithArticleWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
}

export function withArticleWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithArticleWrapperParams,
): (Component: React.ComponentType<P & TWithArticleWrapperProps>) => (props: P) => JSX.Element {
  const { wrapperClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withArticleWrapper(Component: React.ComponentType<P & TWithArticleWrapperProps>) {
    return function ArticleWrapper(props: P) {
      const error = useArticleError();
      const isLoading = useArticleLoading();
      return (
        <div className={classnames(wrapperClassName, styles.container)}>
          {showErrorInWrapper && error && (
            <div className={classnames(errorClassName, styles.contentError)}>
              {errorToString(error)}
            </div>
          )}
          <div className={styles.contentContainer}>
            <Component {...props} error={error} isLoading={isLoading} />
          </div>
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
