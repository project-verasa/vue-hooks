import { createVuexHelper, Helper } from './vuex-helper';
import { UseActions } from './interface';

export const useActions = createVuexHelper<UseActions>(Helper.Actions);
