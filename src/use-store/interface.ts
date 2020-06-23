import { Ref } from '@vue/composition-api';

type Computed<T = any> = Ref<T>;
type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? Computed<R> : never;

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

export type UseState = Mapper<Computed> & MapperWithNamespace<Computed> & MapperForState & MapperForStateWithNamespace;
