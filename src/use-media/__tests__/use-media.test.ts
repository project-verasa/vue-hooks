import { create } from 'match-media-mock';
import { onMounted, onUnmounted } from '@vue/composition-api';

import { useMedia } from '../use-media';
import { renderHook } from '../../../tests/render-hook';

const matchMediaMock = create();

matchMediaMock.setConfig({ type: 'screen', width: 1280, height: 800 });
window.matchMedia = matchMediaMock;

describe('useMedia', () => {
  it('should update media', () => {
    renderHook(() => {
      const match1 = useMedia('(min-width: 800px)');
      const match2 = useMedia('(max-width: 800px)');

      expect(match1.value).toBe(true);
      expect(match2.value).toBe(false);

      matchMediaMock.setConfig({ type: 'screen', width: 750, height: 640 });

      expect(match1.value).toBe(true);
      expect(match2.value).toBe(false);

      onMounted(() => {
        expect(match1.value).toBe(false);
        expect(match2.value).toBe(true);

        matchMediaMock.setConfig({ type: 'screen', width: 1280, height: 800 });

        expect(match1.value).toBe(true);
        expect(match2.value).toBe(false);
      });

      onUnmounted(() => {
        matchMediaMock.setConfig({ type: 'screen', width: 750, height: 640 });

        expect(match1.value).toBe(true);
        expect(match2.value).toBe(false);
      });
    }).destroy();
  });
});
