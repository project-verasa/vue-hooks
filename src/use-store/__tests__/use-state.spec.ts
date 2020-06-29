import { renderHook } from '../../../tests/render-hook';
import { useState } from '../use-state';

interface Inject {
  aliasCount: number;
}

describe('useState', () => {
  it('should update state', () => {
    const { vm } = renderHook<Inject>(() => ({ ...useState({ aliasCount: 'count' }) }));

    expect(vm.aliasCount).toBe(0);
    vm.$store.commit('increment');
    expect(vm.aliasCount).toBe(1);
  });
});
