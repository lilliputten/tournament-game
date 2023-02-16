/** @module withGamePlayingWrapper
 *  @desc Wrapping any component (with GamePlayingWrapper)
 *  @since 2023.02.15, 15:55
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
  useQuestionsIsLoading,
  useQuestionsError,
  useGameSessionIsSessionChecking,
} from '@/core/app/app-reducer';
import { errorToString } from '@/utils';
import { LoaderSplash, toast } from '@/ui-elements';
import { Box, Button, Stack, Typography } from '@mui/material';

import styles from './GamePlayingWrapper.module.scss';

export interface TWithGamePlayingWrapperParams {
  wrapperClassName?: string;
  errorClassName?: string;
  showErrorInWrapper?: boolean;
}

export interface TWithGamePlayingWrapperProps extends JSX.IntrinsicAttributes {
  error?: Error;
  isLoading?: boolean;
  gameSessionIsFinished?: boolean;
  gameSessionIsPlaying?: boolean;
}

export function withGamePlayingWrapperFabric<P extends JSX.IntrinsicAttributes>(
  params: TWithGamePlayingWrapperParams,
): (Component: React.ComponentType<P & TWithGamePlayingWrapperProps>) => (props: P) => JSX.Element {
  const { wrapperClassName, errorClassName, showErrorInWrapper = true } = params;
  return function withGamePlayingWrapper<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function GamePlayingWrapper(props: P) {
      // GameParams...
      const gameSessionIsChecking = useGameSessionIsSessionChecking();
      const gameParamsIsLoading = useGameParamsIsLoading();
      const gameParamsError = useGameParamsError();
      // GameSession
      const gameSessionIsLoading = useGameSessionIsLoading();
      const gameSessionError = useGameSessionError();
      // Questions
      const questionsIsLoading = useQuestionsIsLoading();
      const questionsError = useQuestionsError();
      // Composed...
      const isLoading =
        gameSessionIsChecking || gameParamsIsLoading || gameSessionIsLoading || questionsIsLoading;
      const error = gameSessionError || gameParamsError || questionsError;
      // Effect: Show error toast
      React.useEffect(() => {
        error && toast.error(errorToString(error));
      }, [error]);
      const gameSessionIsFinished = useGameSessionIsFinished();
      const gameSessionIsPlaying = useGameSessionIsPlaying();
      const displayContent = !gameParamsIsLoading; // && !isLoading && !error;
      const router = useRouter();
      const goToStartPage = React.useCallback(() => {
        router.push('/');
      }, [router]);
      const showSmallLoader = isLoading && gameSessionIsPlaying;
      const showLargeLoader = isLoading && !gameSessionIsPlaying;
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
            <Box className={styles.contentContainer}>
              <Component
                {...props}
                error={error}
                isLoading={isLoading}
                gameSessionIsFinished={gameSessionIsFinished}
                gameSessionIsPlaying={gameSessionIsPlaying}
                // gameSessionIsFailed={gameSessionIsFailed}
              />
            </Box>
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
