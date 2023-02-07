/** @module withRouterProps
 *  @desc Wrapping any component with some router-originated properties.
 *  @since 2023.02.01, 19:22
 *  @changed 2023.02.02, 05:39
 */

import React, { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import queryString, { ParsedQuery } from 'query-string';

type TQuery = ParsedQuery<string>; // Record<string, string | undefined>;

export interface TWithRouterProps {
  routerReady: boolean;
  routerRoot: boolean;
  routerPath: string;
  routerQuery: TQuery;
  router: NextRouter;
}
export function withRouterProps<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P & TWithRouterProps>,
) {
  return function WithRouterProps(props: P) {
    const router = useRouter();
    const [routerReady, setRouterReady] = useState<boolean>(false);
    const [routerRoot, setRouterRoot] = useState<boolean>(false);
    const [routerPath, setRouterPath] = useState<string>('');
    const [routerQuery, setRouterQuery] = useState<TQuery>({});
    useEffect(() => {
      const { asPath } = router;
      const routerRoot = !asPath || asPath === '/';
      const query = queryString.parse(router.asPath.split(/\?/)[1]) as TQuery;
      setRouterPath(asPath);
      setRouterRoot(routerRoot);
      setRouterQuery(query);
      setRouterReady(true);
    }, [router]);
    return routerReady ? (
      <Component
        {...props}
        routerReady={routerReady}
        routerRoot={routerRoot}
        routerPath={routerPath}
        routerQuery={routerQuery}
        router={router}
      />
    ) : null;
  };
}
