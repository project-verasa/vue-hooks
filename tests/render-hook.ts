import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Hooks from '../src';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueCompositionAPI);
localVue.use(Hooks);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home' },
    { path: '*', name: '404' },
  ],
});

export interface State {
  count: number;
}

const store = new Vuex.Store<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

/** Hook test tool */
export function renderHook<V>(setup: () => void) {
  const App = defineComponent({
    template: `
      <div id="app">
        <router-view />
      </div>
    `,
    setup,
  });

  return shallowMount<Vue & V>(App, {
    localVue,
    router,
    store,
  });
}
