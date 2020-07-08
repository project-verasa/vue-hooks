import { renderHook } from '../../../tests/render-hook';
import { useThrottleFn } from '../use-throttle-fn';

describe('useThrottleFn', () => {
  let mockFn: jest.Mock;
  jest.useFakeTimers();

  beforeEach(() => {
    mockFn = jest.fn();
  });

  it('should be called at intervals', () => {
    renderHook(() => {
      const fn = useThrottleFn(mockFn, 1000);

      fn();
      expect(mockFn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(500);
      fn();
      expect(mockFn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(1000);
      expect(mockFn.mock.calls.length).toBe(2);
    });
  });

  it('trailing option', () => {
    renderHook(() => {
      const fn = useThrottleFn(mockFn, 1000, false);

      fn();
      expect(mockFn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(500);
      fn();
      expect(mockFn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(1000);
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });
});
