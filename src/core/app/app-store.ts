/** @module app-store
 *  @since 2023.01.28, 21:01
 *  @changed 2023.01.28, 21:01
 */

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import config from '@/config';
import { rootReducer } from './app-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: config.build.DEBUG,
});

type AppDispatch = typeof store.dispatch;

// TODO: To fix typings?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = (): any => useDispatch<AppDispatch>();
