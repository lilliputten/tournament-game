/** @module withGameSessionWrapper
 *  @desc Wrapping any component (with GameSessionWrapper)
 *  @since 2023.02.14, 17:35
 *  @changed 2023.02.17, 00:43
 */

import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import {
  useGameParamsIsLoading,
  useGameParamsError,
  useGameSessionIsLoading,
  useGameSessionError,
  useGameSessionIsPlaying,
  useGameSessionIsFinished,
  // useGameSessionIsFailed,
} from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash, toast } from '@/ui-elements';
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
  isFinished?: boolean;
  isPlaying?: boolean;
  // isFailed?: boolean;
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
      const gameSessionError = useGameSessionError();
      const error = gameSessionError || gameParamsError;
      // Effect: Show error toast
      React.useEffect(() => {
        error && toast.error(errorToString(error));
      }, [error]);
      const isFinished = useGameSessionIsFinished();
      const isPlaying = useGameSessionIsPlaying();
      const displayContent = !isGameParamsLoading;
      const router = useRouter();
      const goToStartPage = React.useCallback(() => {
        router.push('/');
      }, [router]);
      const showSmallLoader = isLoading && isPlaying;
      const showLargeLoader = isLoading && !isPlaying;
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
                isFinished={isFinished}
                isPlaying={isPlaying}
                // isFailed={isFailed}
              />
            </div>
          )}
          {/* Show small loader at the end of article items if some data has loaded */}
          <LoaderSplash
            className={styles.smallLoader}
            spinnerSize="medium"
            // show // Without animations!
            show={showSmallLoader}
          />
          {/* Show large covering loader splash if no data loaded */}
          <LoaderSplash
            className={styles.loaderSplash}
            show={showLargeLoader}
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
