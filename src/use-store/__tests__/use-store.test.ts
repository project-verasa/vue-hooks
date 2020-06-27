import { Store } from 'vuex';

import { useStore } from '../use-store';
import { renderHook, State } from '../../../tests/render-hook';

interface Inject {
  store: Store<State>;
}

describe('useStore', () => {
  it('should update store', () => {
    renderHook(() => {
      const { vm } = renderHook<Inject>(() => ({ ...useStore() }));

      expect(vm.store.state.count).toBe(0);
      vm.store.commit('increment');
      expect(vm.store.state.count).toBe(1);
    });
  });
});
