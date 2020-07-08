import { Ref, ref, watch } from '@vue/composition-api';

import { useThrottleFn } from './use-throttle-fn';

export function useThrottle<T>(value: Ref<T>, delay: number = 250): Ref<T> {
  if (delay <= 0) {
    return value;
  }

  const throttled: Ref<T> = ref(value.value) as Ref<T>;
  const throttle = useThrottleFn(() => {
    throttled.value = value.value;
  }, delay);

  watch(value, throttle);

  return throttled;
}
