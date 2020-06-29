import { useActions } from '../use-actions';
import { renderHook } from '../../../tests/render-hook';

interface Inject {
  asyncIncrement: (delay?: number) => void;
}

describe('useActions', () => {
  it('should async update state', () => {
    const { vm } = renderHook<Inject>(() => ({ ...useActions(['asyncIncrement']) }));

    expect(vm.$store.state.count).toBe(0);

    jest.useFakeTimers();
    vm.asyncIncrement();
    jest.runAllTimers();

    expect(vm.$store.state.count).toBe(1);
  });
});
