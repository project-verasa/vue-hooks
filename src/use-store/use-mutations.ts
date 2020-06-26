import { createVuexHelper, Helper } from './vuex-helper';
import { UseMutations } from './interface';

export const useMutations = createVuexHelper<UseMutations>(Helper.Mutations);
