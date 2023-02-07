/** @module functions
 *  @descr Object helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

type TComposingFunc = (arg?: unknown) => unknown;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NOOP(...args: unknown[]): void {
  // @typescript-eslint/no-empty-function
}

/** Compose functions
 * @param {function[]} funcs
 * @return function
 */
export function composeList(funcs: TComposingFunc[]) {
  return function composed(args?: unknown) {
    return funcs.reduce((arg, func) => {
      return func(arg);
    }, args);
  };
}
/** Interface to composeList: pass functions as arguments */
export function compose(...funcs: TComposingFunc[]): TComposingFunc {
  return composeList(funcs);
}
