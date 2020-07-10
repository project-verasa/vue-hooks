import { VueConstructor } from 'vue';
// 引入 composition-api 特有类型
import '@vue/composition-api';

import { setRuntimeVM } from './utils/runtime';

export * from './use-breakpoint';
export * from './use-debounce';
export * from './use-fullscreen';
export * from './use-media';
export * from './use-router';
export * from './use-scrollbar-width';
export * from './use-store';
export * from './use-throttle';

export default function install(Vue: VueConstructor) {
  Vue.mixin({ beforeCreate: setRuntimeVM });
}
