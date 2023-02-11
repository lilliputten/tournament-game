/** @module withGameSessionWrapper
 *  @desc Wrapping any component (with GameSessionWrapper)
 *  @since 2023.02.10, 20:24
 *  @changed 2023.02.10, 20:24
 */

import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import {
  useGameParamsIsLoading,
  useGameParamsError,
  useGameSessionIsLoading,
  useGameSessionError,
  useGameSessionIsStarted,
  useGameSessionIsWaiting,
  useGameSessionIsFailed,
} from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash } from '@/ui-elements';
import { Box, Button, Stack, Typography } from '@mui/material';

import styles from './GameSessionWrapper.module.scss';

export interface TWithGameSessionWrapperParams {
  wrapperClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithGameSessionWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
  isWaiting?: boolean;
  isStarted?: boolean;
  isFailed?: boolean;
}

export function withGameSessionWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithGameSessionWrapperParams,
): (Component: React.ComponentType<P & TWithGameSessionWrapperProps>) => (props: P) => JSX.Element {
  const { wrapperClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withGameSessionWrapper<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function GameSessionWrapper(props: P) {
      const isGameParamsLoading = useGameParamsIsLoading();
      const gameParamsError = useGameParamsError();
      const isLoading = useGameSessionIsLoading();
      const error = useGameSessionError() || gameParamsError;
      const isWaiting = useGameSessionIsWaiting();
      const isStarted = useGameSessionIsStarted();
      const isFailed = useGameSessionIsFailed();
      const displayContent = !isGameParamsLoading; // && !isLoading && !error;
      /* console.log('[withGameSessionWrapper:GameSessionWrapper]', {
       *   isGameParamsLoading,
       *   gameParamsError,
       *   isLoading,
       *   error,
       *   displayContent,
       * });
       */
      const router = useRouter();
      const goToStartPage = React.useCallback(() => {
        router.push('/');
      }, [router]);
      return (
        <div className={classnames(wrapperClassName, styles.container)}>
          {/* Show error */}
          {showErrorInWrapper && error && (
            <Box className={classnames(styles.contentErrorContainer)} m={2}>
              <Typography className={classnames(errorClassName, styles.contentError)} m={2}>
                {errorToString(error)}
              </Typography>
              <Stack
                className={styles.actions}
                spacing={2}
                direction="row"
                m={2}
                justifyContent="center"
              >
                <Button className="FixMuiButton" onClick={goToStartPage} variant="contained">
                  <span className="Text">Начать сначала</span>
                </Button>
              </Stack>
            </Box>
          )}
          {displayContent && (
            <div className={styles.contentContainer}>
              <Component
                {...props}
                error={error}
                isLoading={isLoading}
                isWaiting={isWaiting}
                isStarted={isStarted}
                isFailed={isFailed}
              />
            </div>
          )}
          {/* Show small loader at the end of article items if some data has loaded */}
          {(isLoading || isWaiting) && (
            <LoaderSplash
              className={styles.smallLoader}
              spinnerSize="medium"
              show // Without animations!
            />
          )}
          {/* Show large covering loader splash if no data loaded */}
          <LoaderSplash
            className={styles.loaderSplash}
            show={isGameParamsLoading}
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
