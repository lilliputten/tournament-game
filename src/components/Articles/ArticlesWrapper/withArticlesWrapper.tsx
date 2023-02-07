/** @module withArticlesWrapper
 *  @desc Wrapping any component (articles list with ArticlesWrapper)
 *  @since 2023.01.30, 18:03
 *  @changed 2023.02.01, 21:41
 */

import React from 'react';
import classnames from 'classnames';

import { useArticles, useArticlesLoading, useArticlesError } from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash } from '@/ui-elements';

import styles from './ArticlesWrapper.module.scss';

export interface TWithArticlesWrapperParams {
  wrapperClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithArticlesWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export function withArticlesWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithArticlesWrapperParams,
): (Component: React.ComponentType<P & TWithArticlesWrapperProps>) => (props: P) => JSX.Element {
  const { wrapperClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withArticlesWrapper<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function ArticlesWrapper(props: P) {
      const isLoading = useArticlesLoading();
      const error = useArticlesError();
      const articles = useArticles();
      const isEmpty = !articles.length;
      return (
        <div className={classnames(wrapperClassName, styles.container)}>
          {showErrorInWrapper && error && (
            <div className={classnames(errorClassName, styles.contentError)}>
              {errorToString(error)}
            </div>
          )}
          <div className={styles.contentContainer}>
            <Component {...props} error={error} isLoading={isLoading} isEmpty={isEmpty} />
          </div>
          {/* Show small loader at the end of article items if some data has loaded */}
          {isLoading && !isEmpty && (
            <LoaderSplash
              className={styles.smallLoader}
              spinnerSize="medium"
              show // Without animations!
            />
          )}
          {/* Show large covering loader splash if no data loaded */}
          <LoaderSplash
            className={styles.loaderSplash}
            show={isLoading && isEmpty}
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
