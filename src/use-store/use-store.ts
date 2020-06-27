import { computed } from '@vue/composition-api';
import { Store } from 'vuex';

import { getRuntimeVM } from '../utils/runtime';

export function useStore<State>() {
  const vm = getRuntimeVM();
  const store = computed(() => vm.$store as Store<State>);

  return {
    store,
  };
}
