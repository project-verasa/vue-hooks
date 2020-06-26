import { createVuexHelper, Helper } from './vuex-helper';
import { UseGetters } from './interface';

export const useGetters = createVuexHelper<UseGetters>(Helper.Gutters);
