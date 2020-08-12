import { Ref, ref } from '@vue/composition-api';

export function useFullscreen(element: Ref<HTMLElement | null> = ref(document.body)) {
  const isFullscreen = ref(false);

  async function exitFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }

    isFullscreen.value = false;
  }

  async function enterFullscreen() {
    await exitFullscreen();

    if (element.value) {
      await element.value.requestFullscreen();
      isFullscreen.value = true;
    }
  }

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}
