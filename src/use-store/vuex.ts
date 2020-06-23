import { mapState } from 'vuex';
import { computed, Ref } from '@vue/composition-api';

import { UseState } from './interface';
import { getRuntimeVM } from '../utils/runtime';

type Computed<T = any> = Ref<T>;
type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? Computed<R> : never;

export enum Helper {
  State,
}

function handleComputed(mappedFn: Function) {
  return computed(() => mappedFn.call(getRuntimeVM()));
}

// export function useState<Key extends string>(map: Key[]): { [K in Key]: Computed };
// export function useState<Map extends Record<string, string>>(map: Map): { [K in keyof Map]: Computed };
// export function useState<Key extends string>(namespace: string, map: Key[]): { [K in Key]: Computed };
// export function useState<Map extends Record<string, string>>(
//   namespace: string,
//   map: Map
// ): {
//   [K in keyof Map]: Computed;
// };
// export function useState<S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
//   map: Map
// ): {
//   [K in keyof Map]: InlineComputed<Map[K]>;
// };
// export function useState<S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
//   namespace: string,
//   map: Map
// ): {};
// export function useState(map: unknown): any {}

export const useState: UseState = (namespace?: string, map: unknown): any => {};
