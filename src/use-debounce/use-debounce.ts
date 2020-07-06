import { Ref, ref, watch } from '@vue/composition-api';

import { useDebounceFn } from './use-debounce-fn';

export function useDebounce<T>(value: Ref<T>, delay: number = 250): Ref<T> {
  if (delay <= 0) {
    return value;
  }

  const delayValue: Ref<T> = ref(value.value) as Ref<T>;
  const debounce = useDebounceFn(() => {
    console.log('更新');
    delayValue.value = value.value;
  }, delay);

  watch(value, debounce);

  return delayValue;
}
