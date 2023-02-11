/** @module NotFoundContent
 *  @since 2022.02.08, 22:44
 *  @changed 2023.01.31, 17:49
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

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
    <Box className={classnames(className)} sx={{ textAlign: 'center' }}>
      <Typography m={2}>
        Page <u>{url}</u> can not be found on this site.
      </Typography>
      <Typography m={2}>
        Try to start from <Link href="/">main page</Link>.
      </Typography>
    </Box>
  );
}

export default NotFoundContent;
