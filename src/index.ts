import { VueConstructor } from 'vue';
// 引入 composition-api 特有类型
import '@vue/composition-api';

import { setRuntimeVM } from './utils/runtime';

export * from './use-router';
export * from './use-store';

export default function install(Vue: VueConstructor) {
  Vue.mixin({ beforeCreate: setRuntimeVM });
}
