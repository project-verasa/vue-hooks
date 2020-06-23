import { Ref } from '@vue/composition-api';

type Dictionary<T> = { [key: string]: T };
type Computed = Ref<any>;

interface Mapper<R> {
  (map: string[]): Dictionary<R>;
  (map: Dictionary<string>): Dictionary<R>;
}

export type UseState = Mapper<Computed>;
