import Vue from 'vue';
import { of, interval } from 'rxjs';

import { renderHook } from '../../../tests/render-hook';
import { useObservable } from '../use-observable';

describe('useObservable', () => {
  it('should get value from sync observable', () => {
    interface Inject {
      value: number;
    }
    const { vm } = renderHook<Inject>(() => ({ value: useObservable(() => of(1)) }));

    expect(vm.value).toBe(1);
  });

  it('should be update value by interval', async () => {
    jest.useFakeTimers();
    interface Inject {
      value: number;
    }
    const { vm } = renderHook<Inject>(() => ({ value: useObservable(() => interval(1000), 0) }));

    expect(vm.value).toBe(0);
    jest.advanceTimersByTime(2000);
    await Vue.nextTick();
    expect(vm.value).toBe(1);
  });
});
