import Vue from 'vue';
import { ref } from '@vue/composition-api';

import { renderHook } from '../../../tests/render-hook';
import { useThrottle } from '../use-throttle';

interface Inject {
  value: number;
  throttleValue: number;
}

describe('useThrottle', () => {
  it('should be update value at intervals', async () => {
    const { vm } = renderHook<Inject>(() => {
      const value = ref(0);
      const throttleValue = useThrottle(value, 1000);

      return {
        value,
        throttleValue,
      };
    });

    jest.useFakeTimers();
    expect(vm.value).toBe(0);
    expect(vm.throttleValue).toBe(0);

    vm.value = 1;
    await Vue.nextTick();
    expect(vm.throttleValue).toBe(1);

    vm.value = 2;
    expect(vm.throttleValue).toBe(1);
    await Vue.nextTick();
    jest.advanceTimersByTime(1000);
    expect(vm.throttleValue).toBe(2);
  });
});
