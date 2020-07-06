import { ref } from '@vue/composition-api';

import { renderHook } from '../../../tests/render-hook';
import { useDebounce } from '../use-debounce';

describe('useDebounce', () => {
  it('should be update value after a few second', () => {
    renderHook(() => {
      jest.useFakeTimers();

      const value = ref(0);
      const delayValue = useDebounce(value, 3000);

      expect(value.value).toBe(0);
      expect(delayValue.value).toBe(0);

      value.value = 1;

      expect(value.value).toBe(1);
      expect(delayValue.value).toBe(0);

      jest.runAllTimers();

      expect(delayValue.value).toBe(1);
    });
  });
});
