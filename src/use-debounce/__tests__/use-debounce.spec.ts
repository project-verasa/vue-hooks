import Vue from 'vue';
import { ref } from '@vue/composition-api';

import { renderHook } from '../../../tests/render-hook';
import { useDebounce } from '../use-debounce';
import { useDebounceFn } from '../use-debounce-fn';

describe('useDebounce', () => {
  it('should be called after a few seconds', () => {
    renderHook(() => {
      const mockFn = jest.fn();
      const debounce = useDebounceFn(mockFn, 3000);

      jest.useFakeTimers();
      debounce();
      expect(mockFn.mock.calls.length).toBe(0);
      jest.runAllTimers();
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });

  it('should be update value after a few seconds', async () => {
    interface Inject {
      value: number;
      delayValue: number;
    }

    const { vm } = renderHook<Inject>(() => {
      const value = ref(0);
      const delayValue = useDebounce(value, 3000);

      return {
        value,
        delayValue,
      };
    });

    jest.useFakeTimers();

    expect(vm.value).toBe(0);
    expect(vm.delayValue).toBe(0);

    vm.value = 1;

    expect(vm.value).toBe(1);
    expect(vm.delayValue).toBe(0);

    await Vue.nextTick();
    jest.runAllTimers();

    expect(vm.value).toBe(1);
    expect(vm.delayValue).toBe(1);
  });
});
