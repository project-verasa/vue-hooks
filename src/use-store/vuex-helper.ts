import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { computed } from '@vue/composition-api';

import { UseState, UseGetters, UseMutations, UseActions } from './interface';
import { getRuntimeVM } from '../utils/runtime';

export enum Helper {
  State,
  Gutters,
  Mutations,
  Actions,
}

type Helpers = UseState | UseGetters | UseMutations | UseActions;

const helpers = {
  [Helper.State]: { fn: mapState, handler: handleComputed },
  [Helper.Gutters]: { fn: mapGetters, handler: handleComputed },
  [Helper.Mutations]: { fn: mapMutations, handler: handleMethod },
  [Helper.Actions]: { fn: mapActions, handler: handleMethod },
};

function handleComputed(mappedFn: Function) {
  return computed(() => mappedFn.call(getRuntimeVM()));
}

function handleMethod(mappedFn: Function) {
  return mappedFn.bind(getRuntimeVM());
}

export function createVuexHelper<T extends Helpers>(h: Helper) {
  const mapper = helpers[h];

  return ((...args: any[]): any => {
    const state = (mapper.fn as any)(...args);
    const dictionary: Record<string, any> = {};

    Object.keys(state).forEach((key) => {
      dictionary[key] = mapper.handler(state[key]);
    });

    return dictionary;
  }) as T;
}
