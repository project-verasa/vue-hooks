import { renderHook } from '../../../tests/render-hook';
import { useMutations } from '../use-mutations';

interface Inject {
  increment: () => void;
}

describe('useMutations', () => {
  it('should be update state', () => {
    const { vm } = renderHook<Inject>(() => ({
      ...useMutations(['increment']),
    }));

    expect(vm.increment).toBeDefined();
    expect(vm.$store.state.count).toBe(0);

    vm.increment();

    expect(vm.$store.state.count).toBe(1);
  });
});
