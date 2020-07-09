import { ref, onMounted, onUnmounted, computed } from '@vue/composition-api';

export function useBreakpoint(
  breakpoints: { [key: string]: number } = { xs: 480, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 },
) {
  const screenWidth = ref(0);
  const setScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };
  const sortBreakpoints = computed(() => Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1)));
  const result = computed(() =>
    sortBreakpoints.value.reduce((acc, [name, width]) => {
      if (screenWidth.value >= width) {
        return name;
      }

      return acc;
    }, sortBreakpoints.value[0][0]),
  );

  onMounted(() => {
    setScreenWidth();
    window.addEventListener('resize', setScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setScreenWidth);
  });

  return result;
}
