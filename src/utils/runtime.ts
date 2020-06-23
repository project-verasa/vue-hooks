import Vue from 'vue';

interface Runtime {
  vm?: Vue;
}

const runtime: Runtime = {};

export function getRuntimeVM(): Vue {
  if (runtime.vm) return runtime.vm;
  throw new ReferenceError('[vue-hooks] need vue instance.');
}

export function setRuntimeVM(this: Vue) {
  const vm = this;

  if (typeof vm.$options.setup === 'function') {
    runtime.vm = vm;
  }
}
