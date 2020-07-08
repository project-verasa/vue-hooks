import { renderHook } from '../../../tests/render-hook';
import { useFullscreen } from '../use-fullscreen';

type Inject = ReturnType<typeof useFullscreen>;

describe('useFullscreen', () => {
  beforeAll(() => {
    document.body.requestFullscreen = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be fullscreen', async () => {
    const { vm } = renderHook<Inject>(() => useFullscreen());

    expect(vm.isFullscreen).toBe(false);
    await vm.enterFullscreen();
    expect(vm.isFullscreen).toBe(true);
    await vm.exitFullscreen();
    expect(vm.isFullscreen).toBe(false);
  });
});
