import { createVuexHelper, Helper } from './vuex-helper';
import { UseState } from './interface';

export const useState = createVuexHelper<UseState>(Helper.State);
