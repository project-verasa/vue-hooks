import { ref, Ref, onMounted, onUnmounted } from '@vue/composition-api';

export function useMedia(mediaQuery: string): Ref<boolean> {
  let mediaQueryList: MediaQueryList | null = null;

  if (typeof window !== 'undefined') {
    mediaQueryList = window.matchMedia(mediaQuery);
  }

  const match = ref(mediaQueryList ? mediaQueryList.matches : false);

  function onChange(this: MediaQueryList, mql: MediaQueryListEvent): void {
    match.value = mql.matches;
  }

  onMounted(() => {
    if (!mediaQueryList) {
      mediaQueryList = window.matchMedia(mediaQuery);
    }

    match.value = mediaQueryList.matches;
    mediaQueryList.addListener(onChange);
  });

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeListener(onChange);
    }
  });

  return match;
}
