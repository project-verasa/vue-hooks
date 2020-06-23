import { computed } from '@vue/composition-api';
// 引入 vue-router 特有类型
import 'vue-router/types/index';

import { getRuntimeVM } from '../utils/runtime';

export function useRouter() {
  const vm = getRuntimeVM();
  const route = computed(() => vm.$route);

  return {
    route,
    router: vm.$router,
  };
}
