import { mapState } from 'vuex';

export enum Helper {
  State,
}

const helpers = {
  [Helper.State]: { fn: mapState }
};

export function createVuexHelper(h: Helper) {
  const helper = helpers[h];
}
