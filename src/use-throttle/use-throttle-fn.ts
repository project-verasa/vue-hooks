export function useThrottleFn<T extends Function>(
  fn: T,
  delay: number = 250,
  options: { trailing: boolean } = { trailing: true }
): T {
  if (delay <= 0) {
    return fn;
  }

  let lastExecTime = 0;
  let lastThis: any;
  let lastArgs: any[];

  function wrapper(this: any, ...args: any[]) {
    const costTime = Date.now() - lastExecTime;

    if (costTime >= delay) {
      lastExecTime = Date.now();
      fn.apply(this, args);
    } else if (options.trailing) {

    }
  }

  return wrapper as any;
}
