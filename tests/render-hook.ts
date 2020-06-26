import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import Hooks from '../src';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(VueCompositionAPI);
localVue.use(Hooks);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home' },
    { path: '*', name: '404' },
  ],
});

/** Hook test tool */
export function renderHook(setup: () => void) {
  const App = defineComponent({
    template: `
      <div id="app">
        <router-view />
      </div>
    `,
    setup,
  });

  return shallowMount(App, {
    localVue,
    router,
  });
}
