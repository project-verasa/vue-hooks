export function useThrottleFn<T extends Function>(fn: T, delay: number = 250, trailing: boolean = true): T {
  if (delay <= 0) {
    return fn;
  }

  let lastExecTime = 0;
  let lastThis: unknown;
  let lastArgs: unknown[];
  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function lastExecFn() {
    clear();
    fn.apply(lastThis, lastArgs);
  }

  function wrapper(this: unknown, ...args: unknown[]) {
    const costTime = Date.now() - lastExecTime;

    clear();

    if (costTime > delay) {
      lastExecTime = Date.now();
      fn.apply(this, args);
    } else if (trailing) {
      lastThis = this;
      lastArgs = args;
      timer = setTimeout(lastExecFn, delay);
    }
  }

  return wrapper as any;
}
