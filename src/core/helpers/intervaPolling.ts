/**
 * Usage:
 *
 * intervalPolling(fetch(...), 1000).subscribe((res) => { console.log(res) });
 *
 * const polling = intervalPolling(fetch(...), 1000).polling();
 * polling.close();
 *
 * const polling = intervalPolling(fetch(...), 1000);
 * polling.subscribe({
 *   next: (res) => {
 *     console.log(res);
 *     if (res.ok) {
 *       polling.close();
 *     }
 *   }
 *   error: (err) => { console.log(err) }
 * });
 */

export type SuccessObserver<R> = (value: R) => void;
export type ErrorObserver = (e: Error | string | unknown) => void;
export type Unsubscription = () => void;

export interface Observer<R> {
  next: SuccessObserver<R>;
  error?: ErrorObserver;
}

export type PollingFunction<T, R> = (params?: T) => Promise<R>;

interface Observable<R> {
  subscribe(next: Observer<R> | SuccessObserver<R>, error?: ErrorObserver): void;

  unsubscribe(): void;
}

export interface IntervalObserver<R = unknown> extends Observable<R> {
  polling(): this;
  close(): this;
}

export interface Options<T> {
  maxCount?: number;
  params?: T;
}

export const intervalPolling = <T = unknown, R = unknown>(
  polling: PollingFunction<T, R>,
  interval: number,
  options?: Options<T>,
): IntervalObserver<R> => {
  let started = false;
  let closed = false;
  let pollingTimerId: NodeJS.Timeout;
  let maxCount = options?.maxCount;
  const params = options?.params;
  const subscribers: Observer<R>[] = [];
  const onNext: SuccessObserver<R> = (value: R): void => {
    subscribers.forEach((subscriber) => {
      if (typeof subscriber.next === 'function') {
        subscriber.next(value);
      }
    });
  };
  const onError: ErrorObserver = (value: Error | string | unknown) => {
    subscribers.forEach((subscriber) => {
      if (typeof subscriber.error === 'function') {
        subscriber.error(value);
      }
    });
  };
  const addSubscription = ({ next, error }: Observer<R>): Observer<R> => {
    if (typeof next !== 'function') {
      throw new Error(`The "next" property must be function`);
    }
    const subscriber: Observer<R> = { next };
    if (typeof error === 'function') {
      subscriber.error = error;
    }
    subscribers.push(subscriber);
    return subscriber;
  };
  const removeSubscription = (subscriber: Observer<R>): void => {
    const index = subscribers.indexOf(subscriber);
    index > -1 && subscribers.splice(index, 1);
  };
  const removeAllSubscription = (): void => {
    subscribers.length = 0;
  };

  const runPolling = async (): Promise<void> => {
    while (started && !closed) {
      if (typeof maxCount === 'number') {
        if (maxCount > 0) maxCount--;
        else break;
      }

      await polling(params).then(onNext).catch(onError);

      await new Promise((resolve) => {
        pollingTimerId = setTimeout(resolve, interval);
      });
    }
  };

  return {
    polling(): IntervalObserver<R> {
      if (!started) {
        started = true;
        closed = false;
        runPolling();
      }
      return this;
    },
    close(): IntervalObserver<R> {
      removeAllSubscription();
      started = false;
      closed = true;
      pollingTimerId && clearTimeout(pollingTimerId);
      return this;
    },
    subscribe(
      observerOrNext?: Observer<R> | SuccessObserver<R>,
      error?: ErrorObserver,
    ): Unsubscription {
      let next: SuccessObserver<R>;
      if (typeof observerOrNext === 'function') {
        next = observerOrNext;
      } else if (typeof observerOrNext === 'object') {
        next = observerOrNext.next;
        error = observerOrNext.error;
      } else {
        throw new Error(`The "observerOrNext" argument must be type Function or Object`);
      }
      const addedSubscriber = addSubscription({ next, error });

      this.polling();

      return () => removeSubscription(addedSubscriber);
    },
    unsubscribe(): void {
      removeAllSubscription();
    },
  };
};
