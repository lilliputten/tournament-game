/** @module promises
 *  @descr Promise-related helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import { NOOP } from './functions';

export interface TDeferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (error?: unknown) => void;
}

export function Deferred<T>(): TDeferred<T> {
  let resolve = NOOP as (value: T | PromiseLike<T>) => void;
  let reject = NOOP;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const defer: TDeferred<T> = {
    promise,
    resolve,
    reject,
  };
  return defer;
}
