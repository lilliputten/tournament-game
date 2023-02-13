/** @module app-wrapper
 *  @since 2023.01.28, 21:01
 *  @changed 2023.02.13, 20:38
 */

import { muiTheme, ThemeProvider } from '@/global/mui-theme';

import { TReactContent } from '@/utils/react-types';
import GameParamsControlNode from '@/features/GameParams/expose-control-node';
import GameWaitingControlNode from '@/features/GameWaiting/expose-control-node';
import GameSessionControlNode from '@/features/GameSession/expose-control-node';

interface AppWrapperProps {
  children?: TReactContent;
}

export default function AppWrapper(props: AppWrapperProps): JSX.Element {
  const { children } = props;
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <GameParamsControlNode />
        <GameWaitingControlNode />
        <GameSessionControlNode />
        {children}
      </ThemeProvider>
    </>
  );
}
