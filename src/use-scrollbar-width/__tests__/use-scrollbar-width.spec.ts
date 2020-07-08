// @ts-ignore
import { replaceRaf } from 'raf-stub';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';

import { renderHook } from '../../../tests/render-hook';
import { useScrollbarWidth } from '../use-scrollbar-width';

declare var requestAnimationFrame: {
  add: (cb: Function) => number;
  remove: (id: number) => void;
  flush: (duration?: number) => void;
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

interface Inject {
  width?: number;
}

describe('useScrollbarWidth', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should return scrollbar width', () => {
    scrollbarWidth.__cache = 18;
    const { vm } = renderHook<Inject>(() => ({ width: useScrollbarWidth() }));

    expect(vm.width).toBe(18);
  });

  it('should be update scrollbar width after mounted', () => {
    scrollbarWidth.__cache = undefined;
    const { vm } = renderHook<Inject>(() => ({ width: useScrollbarWidth() }));

    expect(vm.width).toBeUndefined();
    scrollbarWidth.__cache = 32;
    requestAnimationFrame.step();
    expect(vm.width).toBe(32);
  });
});
