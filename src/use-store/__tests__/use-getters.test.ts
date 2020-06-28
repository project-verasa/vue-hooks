import { useGetters } from '../use-getters';
import { renderHook } from '../../../tests/render-hook';

interface Inject {
  plusOne: number;
}

describe('useGetters', () => {
  it('should update getter', () => {
    const { vm } = renderHook<Inject>(() => ({ ...useGetters(['plusOne']) }));

    expect(vm.plusOne).toBeDefined();
    expect(vm.plusOne).toBe(1);

    vm.$store.commit('increment');

    expect(vm.plusOne).toBe(2);
  });
});
