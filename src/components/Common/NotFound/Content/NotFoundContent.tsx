/** @module NotFoundContent
 *  @since 2022.02.08, 22:44
 *  @changed 2023.01.31, 17:49
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Link from 'next/link';

interface TNotFoundContentProps {
  className?: string;
}
function NotFoundContent(props: TNotFoundContentProps): JSX.Element {
  const { className } = props;
  const router = useRouter();
  const [url, setUrl] = useState('none');
  // NOTE: Preventing NextJS Warning: Text content did not match.
  useEffect(() => {
    setUrl(router.asPath);
  }, [router]);
  return (
    <div className={classnames(className)}>
      <p>
        Page <u>{url}</u> can not be found on this site.
      </p>
      <p>
        Try to start from <Link href="/">main page</Link>.
      </p>
    </div>
  );
}

export default NotFoundContent;
