import Vue from 'vue';
import { interval } from 'rxjs';

import { renderHook } from '../../../tests/render-hook';
import { useObservable } from '../use-observable';

describe('useObservable', () => {
  it('no default value', async () => {
    jest.useFakeTimers();
    interface Inject {
      value: number;
    }
    const { vm } = renderHook<Inject>(() => ({ value: useObservable(() => interval(1000)) }));

    expect(vm.value).toBeUndefined();
    jest.advanceTimersByTime(1000);
    await Vue.nextTick();
    expect(vm.value).toBe(0);
  });

  it('default value', async () => {
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
