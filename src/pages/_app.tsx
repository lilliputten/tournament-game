/** @module _app
 *  @desc Root application component
 *  @since 2023.01.28, 21:01
 *  @changed 2023.01.28, 22:06
 */

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/global/global-includes';
import { store } from '@/core/app/app-store';
import AppWrapper from '@/core/app/app-wrapper';

import '@/global/global-styles.scss';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}
