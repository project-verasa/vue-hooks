import { Ref } from '@vue/composition-api';
import { Commit, Dispatch } from 'vuex';

type Computed<T = any> = Ref<T>;
type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? Computed<R> : never;
type MutationMethod = (...args: any[]) => void;
type ActionMethod = (...args: any[]) => Promise<any>;
type InlineMethod<T extends (fn: any, ...args: any[]) => any> = T extends (fn: any, ...args: infer Args) => infer R
  ? (...args: Args) => R
  : never;

interface Mapper<R> {
  <Key extends string>(map: Key[]): { [K in Key]: R };
  <Map extends Record<string, string>>(map: Map): { [K in keyof Map]: R };
}

interface MapperWithNamespace<R> {
  <Key extends string>(namespace: string, map: Key[]): { [K in Key]: R };
  <Map extends Record<string, string>>(namespace: string, map: Map): {
    [K in keyof Map]: R;
  };
}

interface MapperForState {
  <S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(map: Map): {
    [K in keyof Map]: InlineComputed<Map[K]>;
  };
}

interface MapperForStateWithNamespace {
  <S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
    namespace: string,
    map: Map
  ): {};
}

interface MapperForMutation {
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any> = {}>(map: Map): {
    [K in keyof Map]: InlineMethod<Map[K]>;
  };
}

interface MapperForMutationWithNamespace {
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any>>(namespace: string, map: Map): {
    [K in keyof Map]: InlineMethod<Map[K]>;
  };
}

interface MapperForAction {
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(map: Map): {
    [K in keyof Map]: InlineMethod<Map[K]>;
  };
}

interface MapperForActionWithNamespace {
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(
    namespace: string,
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}

export type UseState = Mapper<Computed> & MapperWithNamespace<Computed> & MapperForState & MapperForStateWithNamespace;
export type UseGetters = Mapper<Computed> & MapperWithNamespace<Computed>;
export type UseMutations = Mapper<MutationMethod> &
  MapperWithNamespace<MutationMethod> &
  MapperForMutation &
  MapperForMutationWithNamespace;
export type UseActions = Mapper<ActionMethod> &
  MapperWithNamespace<ActionMethod> &
  MapperForAction &
  MapperForActionWithNamespace;
