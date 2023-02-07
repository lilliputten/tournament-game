/** @module objects
 *  @descr Object helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import {
  squareOpen,
  squareClose,
  curlyOpen,
  curlyClose,
  errRegExp,
  errDelim,
  errDelim2,
  maxShowStringLength,
} from '@/config/constants';

import { safeEscape } from './strings';

export function reverseKeyAndValueReducer(
  result: Record<string, string>,
  [key, val]: [string, string],
): Record<string, string> {
  return { ...result, [val]: key };
}
export function reverseDataHash(hash: Record<string, string>): Record<string, string> {
  return Object.entries(hash).reduce(reverseKeyAndValueReducer, {});
}

export function isDomElement(obj: HTMLElement): boolean {
  return (
    !!obj &&
    (typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement // DOM2
      : typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string')
  );
}

export function isArray(obj: unknown): boolean {
  return Array.isArray(obj);
}

export function arrayIndexOf(arr: string | unknown[], find: unknown): number {
  if (!(arr instanceof Array) || !arr.length) {
    return -1;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === find) {
      return i;
    }
  }
  return -1;
}

export function asyncPromiseState(promise: Promise<unknown>): Promise<string> {
  // See also `config.constants:promiseStatusTexts` -- for `vow` module
  const temp = {};
  return Promise.race([promise, temp]).then(
    (value) => (value === temp ? 'PENDING' : 'FULFILLED'),
    () => 'REJECTED',
  );
}

/**
 * @param {} error
 * @return {object}
 */
interface ErrorLike {
  message?: string;
  errorMessages?: string[];
  textStatus?: string;
  error?: SingleError;
  jqXHR?: XMLHttpRequest;
  description?: string;
  url?: string;
  location?: string;
  errorText?: string;
  status?: string;
  trace?: string[];
}
type SingleError = string | Error | ErrorLike;
type PluralErrors = SingleError | SingleError[];
export function errorToPlainString(error: undefined | PluralErrors): string {
  // opt = opt || {};

  let text = '',
    plusText,
    match;

  try {
    if (
      typeof error === 'string' &&
      (match = error.match(/<soap:Text.*?>([\s\S]*)\s*<\/soap:Text/m)) != null &&
      match[0]
    ) {
      text = '<b>SOAP error:</b> ' + match[1];
    }
    // If the error has already been processed or is empty, then we do not show anything
    else if (!error) {
      return '';
    }
    // If the error is not an object, we show it as a string
    else if (typeof error !== 'object') {
      text = String(error);
    } else if (Array.isArray(error)) {
      text = error.map(errorToPlainString).join(errDelim);
    }
    // Object with an error
    else if (error instanceof Error) {
      text = error.message || String(error);
    } else if (typeof error.message === 'string') {
      console.error('errors.errorToPlainString message', { error: error }); // eslint-disable-line no-console
      text += error.message;
    } else if (Array.isArray(error.errorMessages)) {
      console.error('errors.errorToPlainString errorMessages', { error: error }); // eslint-disable-line no-console
      text += error.errorMessages
        .map(function (error: SingleError) {
          return errorToPlainString(error);
        })
        .join(errDelim2);
    } else if (error.textStatus === 'parsererror') {
      text = 'Server response processing error';
      plusText =
        error.error ||
        (error.jqXHR &&
          error.jqXHR.responseText &&
          (match = error.jqXHR.responseText.match(/<b>(Parse error|Fatal error).*/)) !== null &&
          match[0]);
      if (plusText) {
        if (typeof plusText === 'string' && plusText.length > maxShowStringLength) {
          plusText = plusText.substring(0, maxShowStringLength - 3) + '...';
        }
        text += errDelim + plusText;
      }
    } else if (error.jqXHR && !error.error && error.textStatus === 'error') {
      text = 'Incorrect server response (the server is unavailable)';
    } else if (error.error === 'jqXHR') {
      console.error('errors.errorToPlainString jqXHR', { error: error }); // eslint-disable-line no-console
      text = error.description || 'AJAX error';
      const props = {
          address: error.url || error.location,
        },
        propsText = Object.keys(props)
          .filter((name: string) => !!props[name as keyof typeof props])
          .map((name) => name + ': ' + props[name as keyof typeof props])
          .join(', ');

      if (propsText) {
        text += ' (' + propsText + ')';
      }
      return text;
    }
    // Chaining errors
    else if (error.error && typeof error.error === 'object') {
      text += errorToPlainString(error.error);
    }
    // Server exception, like: {error: "Exception", errorCode: 0, description: "Library\Helper::getJsonResponse: Node error: ..."}
    else if (error.error === 'Exception' && error.description) {
      text += 'Server exception: ' + error.description;
    } else {
      text =
        error.description ||
        error.message ||
        error.error ||
        error.errorText ||
        error.status ||
        'Unknown error';
      if (text === 'canceledByUser') {
        // TODO?
        text = 'Canceled by user';
      }
      const plus = [];
      if (error.jqXHR && error.jqXHR.responseText) {
        plus.push(error.jqXHR.responseText);
      }
      if (error.error && typeof error.error === 'object') {
        plus.push(error.error);
      }
      if (Array.isArray(error.trace)) {
        plus.push('Error catched in: ' + error.trace.join(', '));
      }
      if (plus.length) {
        text +=
          errDelim2 +
          plus
            .map(function (plus) {
              if (typeof plus === 'object') {
                plus = errorToPlainString(plus);
              }
              if (typeof plus === 'string' && plus.match(/<html/i)) {
                plus =
                  'HTML: ' +
                  plus
                    .replace(/<(script|link|style)[^<>]*>[\s\S]*?<\/\1>/gm, '')
                    .replace(/(\s*<[^<>]*>\s*)+/gm, ' ');
              }
              if (typeof plus === 'string' && plus.length > maxShowStringLength) {
                plus = plus.substring(0, maxShowStringLength - 3) + '...';
              }
              return plus;
            })
            .join(errDelim);
      }
    }

    // Strip extra spaces...
    const result = text
      .replace(/[ \t]+\n/gm, '\n') // Hanged spaces
      .replace(/\n[ \t]+/gm, '\n') // Hanged spaces
      .replace(/\n{3,}/gm, '\n\n') // Extra newlines
      .trim(); // Trim

    return result;
  } catch (error) {
    console.error('errorToPlainString catched error:', { error: error }); // eslint-disable-line no-console
    debugger; // eslint-disable-line no-debugger
    // return String(error);
    throw error;
  }
}

export function safeStringify(
  this: unknown,
  obj: unknown,
  objId?: string,
  depth?: number,
  cache?: unknown[],
  cacheNames?: string[],
  nice?: boolean | number,
): string {
  objId = objId || '@';
  depth = depth || 0;
  cache = cache || [];
  cacheNames = cacheNames || [];
  try {
    // Reusable variables...
    let p, n, res, id, val, itemId;
    // Nicify params...
    let niceSpace = ''; // Single indent space
    let niceBaseSpace = ''; // This depth level indent space
    if (nice) {
      niceSpace = ' ';
      if (typeof nice === 'number') {
        for (n = 1; n < nice; n++) {
          niceSpace += ' ';
        }
      }
      for (n = 0; n < depth; n++) {
        niceBaseSpace += niceSpace;
      }
    }
    const niceDepthSpace = niceBaseSpace + niceSpace; // This depth level indent space
    const niceNL = nice ? '\n' : ''; // Newline
    if (obj == undefined || (typeof obj === 'number' && isNaN(obj))) {
      // Null-like
      return 'null'; // Only JSON symbol for undefined or null values
    } else if (typeof obj === 'function') {
      p = obj.name
        ? 'function ' + obj.name
        : obj.toString
        ? safeEscape(obj.toString().replace(/[\n\r\t ]+/g, ' '))
        : 'anonymous function';
      p = p.replace(/^(function\s+\S+)\(.*$/, '$1');
      if (p.length > 80) {
        p = p.substring(0, 80 - 3) + '...';
      }
      return '"[' + p + ']"';
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
      // Simple type
      return safeEscape(obj);
    } else if (typeof obj === 'string' || typeof obj === 'boolean') {
      // Quotable type
      return safeEscape(obj, true);
    } else if (isDomElement(obj as HTMLElement)) {
      const domObj = obj as HTMLElement;
      // domNode?
      let domId = '';
      if (domObj.nodeType) {
        domId += '(nodeType:' + domObj.nodeType + ')';
      }
      if (domObj.className) {
        domId += '.' + domObj.className.replace(/ /g, '.');
      }
      if (domObj.id) {
        domId += '#' + domObj.id;
      }
      domId = '"[DomNode: ' + safeEscape(domId) + ']"';
      return domId;
    } else if (
      typeof XMLHttpRequest === 'object' &&
      obj instanceof XMLHttpRequest &&
      (obj as XMLHttpRequest).readyState != null
    ) {
      // XHR?
      // readyState values:
      // 0 	UNSENT 	Client has been created. open() not called yet.
      // 1 	OPENED 	open() has been called.
      // 2 	HEADERS_RECEIVED 	send() has been called, and headers and status are available.
      // 3 	LOADING 	Downloading; responseText holds partial data.
      // 4 	DONE 	The operation is complete.
      const readyState = (obj as XMLHttpRequest).readyState;
      let info = 'readyState:' + readyState;
      if (readyState === 4) {
        if ((obj as XMLHttpRequest).status) {
          info += ',status:' + (obj as XMLHttpRequest).status;
        }
      }
      return '"[XHR ' + safeEscape(info) + ']"';
    }
    // TODO: Event object
    else if (obj instanceof Error) {
      // Error?
      // Using `UTILS.errorToPlainString` (included `errors` module to `UTILS`)
      let message = errorToPlainString(obj);
      let stack = String(obj.stack || '').replace(errRegExp, '');
      // Remove message duplicate from beggining of stack info
      if (stack.indexOf(message) === 0) {
        stack = stack.substring(message.length).trim();
      }
      if (obj.name && obj.name !== 'Error') {
        // oxpd-style error
        message = '[' + obj.name + '] ' + message;
      }
      if (stack) {
        message += '\n' + stack;
      }
      return safeEscape('Error: ' + message, true);
    } else if ((p = cache.indexOf(obj)) !== -1) {
      // Cyclic reference?
      const cacheId = cacheNames[p];
      return '"[cyclic: ' + safeEscape(cacheId) + ']"';
    } else if (obj instanceof Array /* || typeof obj[Symbol.iterator] === 'function' */) {
      // Array?
      cache.push(obj);
      cacheNames.push(objId);
      res = squareOpen;
      for (n = 0; n < obj.length; n++) {
        itemId = objId + squareOpen + n + squareClose;
        val = obj[n];
        if (n) {
          res += ',';
        }
        res +=
          niceNL + niceDepthSpace + safeStringify(val, itemId, depth + 1, cache, cacheNames, nice);
      }
      res += niceNL + niceBaseSpace + squareClose;
      return res;
    } else {
      // Hash object...
      cache.push(obj);
      cacheNames.push(objId);
      res = curlyOpen;
      // var newObj = Object.keys(obj).reduce(function(newObj, id) {
      p = Object.keys(obj) as string[];
      p.sort();
      for (n = 0; n < p.length; n++) {
        id = p[n];
        val = (obj as Record<string, unknown>)[id];
        itemId = objId + (/\W/.test(id) ? squareOpen + id + squareClose : '.' + id);
        if (n) {
          res += ',';
        }
        val = safeStringify(val, itemId, depth + 1, cache, cacheNames, nice);
        val = safeEscape(id, true) + ':' + val;
        res += niceNL + niceDepthSpace + val;
      }
      res += niceNL + niceBaseSpace + curlyClose;
      return res;
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}

export function niceStringify(data: unknown): string {
  return safeStringify(data, undefined, undefined, undefined, undefined, true);
}

interface DeepData {
  a: number | { b: number };
}
/**
 * getDeepValue -- Fetch value (id may be hierarchial path like `Account.Login`)
 * @param {Object} data -- Data object
 * @param {String} dataId -- Field id (may be hierarchial path like `Account.Login`)
 */
export function getDeepValue(data: DeepData | null | undefined, dataId: string): unknown {
  if (!data) {
    return undefined;
  }
  let value = data;
  if (typeof value === 'object' && dataId && typeof dataId === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataId.split('.').forEach((chunkId) => (value = (value as any)[chunkId]));
  }
  return value;
}

interface ObjectsDiff {
  added?: string[];
  removed?: string[];
  diff?: string[];
  equals?: string[];
}
/** Compare two objects.
@return { added, removed, diff, [equals] }
*/
export function getObjectsDiff(
  objOld: { [x: string]: unknown; a?: number; b?: string } | undefined | null,
  objNew: { [x: string]: unknown; a?: number; b?: string } | undefined | null,
): ObjectsDiff {
  if (objNew == undefined || objOld == undefined) {
    // One of objects is undefined -- they're different.
    return {};
  }
  const keysNew = Object.keys(objNew);
  const keysOld = Object.keys(objOld);
  const results: ObjectsDiff = {
    // added: [],
    // removed: [],
    // diff: [],
    // equals: [],
  };
  keysNew.forEach((key) => {
    if (!keysOld.includes(key)) {
      (results.added || (results.added = [])).push(key);
    } else if (objNew[key] !== objOld[key]) {
      (results.diff || (results.diff = [])).push(key);
    }
  });
  keysOld.forEach((key) => {
    if (!keysNew.includes(key)) {
      (results.removed || (results.removed = [])).push(key);
    }
  });
  return results;
}
