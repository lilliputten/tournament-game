/** @module ArticlesList
 *  @since 2023.01.27, 19:57
 *  @changed 2023.02.02, 08:33
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { compose } from 'redux';
import classnames from 'classnames';

import { useArticles, useArticlesSearchParams } from '@/core/app/app-reducer';
import { TWithDynamicScrollerProps, withDynamicScrollerFabric } from '@/ui-elements';
import { setNextPage } from '@/features/articles/reducer';
import { ArticleCardById, EmptyArticleCard } from '../ArticleCard';
import { TWithArticlesWrapperProps, withArticlesWrapperFabric } from '../ArticlesWrapper';

import styles from './ArticlesList.module.scss';
import { useAppDispatch } from '@/core';

interface TArticlesListProps extends TWithArticlesWrapperProps, TWithDynamicScrollerProps {
  className?: string;
  setListContainerRef?: (ref: React.RefObject<HTMLDivElement> | null) => void;
}

export function ArticlesList(props: TArticlesListProps): JSX.Element {
  const { className, isLoading, isScrolledToEnd, setListContainerRef } = props;
  const ref = useRef<HTMLDivElement>(null);

  // TODO: To make card type selectable (for demo purposes)
  // const cardType = 'medium';
  const { cardType } = useArticlesSearchParams();

  useEffect(() => {
    if (setListContainerRef) {
      setListContainerRef(ref);
    }
  }, [ref, setListContainerRef]);

  const dispatch = useAppDispatch();

  // Detecting end-page scrolling and invoke next articles loading.
  useEffect(() => {
    if (isScrolledToEnd) {
      dispatch(setNextPage());
    }
  }, [dispatch, isLoading, isScrolledToEnd]);

  const articles = useArticles();

  const content = useMemo(() => {
    if (!articles.length) {
      return <div className={styles.messageSection}>No articles found.</div>;
    }
    return articles.map((article, n) => {
      if (!article) {
        const key = 'empty-' + n;
        return <EmptyArticleCard cardType={cardType} key={key} />;
      }
      const { id, uniqueId } = article;
      return <ArticleCardById cardType={cardType} key={uniqueId || id} id={id} />;
    });
  }, [articles, cardType]);

  return (
    <div ref={ref} className={classnames(className, styles.container)}>
      {content}
    </div>
  );
}

// Export wrapped version
export const WrappedArticleList = compose<React.FC<TArticlesListProps>>(
  withArticlesWrapperFabric<TArticlesListProps>({
    errorClassName: styles.errorSection,
    wrapperClassName: styles.outerWrapper,
  }),
  // NOTE: DynamicScroller should be applied after ArticlesWrapper so
  // DynamicScroller is expecting isLoading property from ArticlesWrapper.
  withDynamicScrollerFabric<TArticlesListProps>({ gap: 200 }),
)(ArticlesList);
