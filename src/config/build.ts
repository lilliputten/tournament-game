/** @module config.build
 *  @description Build management config
 *  @since 2023.01.26, 18:28
 *  @changed 2023.01.26, 19:10
 */

export const isBrowser = typeof window !== 'undefined'; // NOTE: `!!process.browser` -- tsserver 6385: `browser` is deprecated
export const isLocalhost = isBrowser && window.location.host.startsWith('localhost');

export const nodeEnv = process.env.nodeEnv;
export const isTest = !!process.env.isTest;

export const devMode = process.env.NEXT_PUBLIC_DEV;
export const isDev = isTest || !!devMode;
export const isProd = !isDev;
export const isDevServer = isDev && devMode === 'DEVSERVER';

export const DEBUG = isDev;

export const version = process.env.version;
export const timetag = process.env.timetag;
export const timestamp = process.env.timestamp;
export const buildTag = process.env.buildTag;
