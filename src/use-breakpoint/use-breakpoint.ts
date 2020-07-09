import { ref, onMounted, onUnmounted, computed } from '@vue/composition-api';

export function useBreakpoint(
  breakpoints: { [key: string]: number } = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 },
) {
  const screenWidth = ref(0);
  const setScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };
  const sortBreakpoints = computed(() => Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1)));
  // const result = computed(() => sortBreakpoints.value.reduce);

  onMounted(() => {
    setScreenWidth();
    window.addEventListener('resize', setScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setScreenWidth);
  });
}
