import { Ref, ref, onMounted, onUnmounted } from '@vue/composition-api';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';

export function useScrollbarWidth(): Ref<number | undefined> {
  const width = ref(scrollbarWidth());
  let rafID: ReturnType<typeof requestAnimationFrame>;

  onMounted(() => {
    if (typeof width.value === 'undefined') {
      rafID = requestAnimationFrame(() => {
        width.value = scrollbarWidth();
      });
    }
  });

  onUnmounted(() => {
    if (rafID) {
      cancelAnimationFrame(rafID);
    }
  });

  return width;
}
