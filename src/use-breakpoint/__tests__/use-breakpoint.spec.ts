import { renderHook } from '../../../tests/render-hook';
import { useBreakpoint } from '../use-breakpoint';

interface Inject {
  breakpoint: string;
}

const defaultInnerWidth = window.innerWidth;
const changeInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { value: width });
  window.dispatchEvent(new Event('resize'));
};

describe('useBreakpoint', () => {
  afterEach(() => {
    changeInnerWidth(defaultInnerWidth);
  });

  it('default breakpoints', async () => {
    const { vm } = renderHook<Inject>(() => ({ breakpoint: useBreakpoint() }));

    changeInnerWidth(480);
    expect(vm.breakpoint).toBe('xs');

    changeInnerWidth(576);
    expect(vm.breakpoint).toBe('sm');

    changeInnerWidth(768);
    expect(vm.breakpoint).toBe('md');

    changeInnerWidth(992);
    expect(vm.breakpoint).toBe('lg');

    changeInnerWidth(1200);
    expect(vm.breakpoint).toBe('xl');

    changeInnerWidth(1600);
    expect(vm.breakpoint).toBe('xxl');
  });

  it('custom breakpoint', () => {
    const { vm } = renderHook<Inject>(() => ({ breakpoint: useBreakpoint({ small: 800, large: 1024 }) }));

    changeInnerWidth(800);
    expect(vm.breakpoint).toBe('small');

    changeInnerWidth(1048);
    expect(vm.breakpoint).toBe('large');
  });
});
