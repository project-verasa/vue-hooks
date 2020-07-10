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
  getters: {
    plusOne(state) {
      return state.count + 1;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    asyncIncrement(context, delay: number = 1000) {
      setTimeout(() => {
        context.commit('increment');
      }, delay);
    },
  },
});

/** Hook test tool */
export function renderHook<V>(
  setup: () => void,
  template: string = `
    <div id="app">
      <router-view />
    </div>
  `,
) {
  const App = defineComponent({
    template,
    setup,
  });

  return shallowMount<Vue & V>(App, {
    localVue,
    router,
    store,
  });
}
