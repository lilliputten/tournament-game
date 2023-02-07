/** @module PageHeader
 *  @since 2023.01.27, 16:20
 *  @changed 2023.02.02, 00:32
 */

import React, { useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import { useAppDispatch } from '@/core';
import { Panel, withRouterProps, TWithRouterProps } from '@/ui-elements';
import { useArticlesSearchParams } from '@/core/app/app-reducer';
import { setQuery } from '@/features/articles/reducer';
import { HeaderSearchBox } from '@/ui-elements';

import styles from './PageHeader.module.scss';

interface TPageHeaderProps extends TWithRouterProps {
  className?: string;
}

function Logo({ isRoot }: { isRoot: boolean }): JSX.Element {
  const className = classnames(styles.box, styles.logoBox);
  if (!isRoot) {
    return <Link className={className} href="/" />;
  } else {
    return <span className={className} />;
  }
}

interface TMemo {
  routerPath: string;
  query: string;
}

function PageHeader(props: TPageHeaderProps): JSX.Element {
  const { className, routerRoot, routerPath, router } = props;
  const dispatch = useAppDispatch();
  const isRoot = !!routerRoot;
  const { query } = useArticlesSearchParams();
  const memo = useMemo<TMemo>(() => ({ routerPath: '', query: '' }), []);
  useEffect(() => {
    memo.routerPath = routerPath || '';
    memo.query = query;
  }, [memo, routerPath, query]);
  const setQueryHandler = useCallback(
    (text: string) => {
      if (text !== memo.query) {
        dispatch(setQuery(text));
      }
      if (memo.routerPath !== '/articles') {
        router.push('/articles');
      }
    },
    [dispatch, memo, router],
  );
  return (
    <Panel
      className={classnames(className, styles.container, isRoot && styles.isRoot)}
      tag="header"
      flex
    >
      <Logo isRoot={isRoot} />
      <div className={classnames(styles.box, styles.searchBox)}>
        <HeaderSearchBox query={query} setQuery={setQueryHandler} />
      </div>
    </Panel>
  );
}

export default withRouterProps(PageHeader);
