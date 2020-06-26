import { useRouter } from '../use-router';
import { renderHook } from '../../../tests/render-hook';

describe('useRouter', () => {
  it('should be defined', () => {
    expect(useRouter).toBeDefined();
  });

  it('should update route', () => {
    renderHook(() => {
      const { route, router } = useRouter();

      expect(route.value.name).toBe('home');
      router.push({ path: '/test' });
      expect(route.value.name).toBe('404');
    });
  });
});
