import { Ref, ref, watchEffect, UnwrapRef } from '@vue/composition-api';
import { Observable, BehaviorSubject } from 'rxjs';

type RefArray = Array<Ref<unknown>>;
type Factory<T> = (value$: Observable<T>) => Observable<T>;
type FactoryWithInputs<T, I> = (value$: Observable<T>, inputs$: Observable<I>) => Observable<T>;

export function useObservable<T>(factory: Factory<UnwrapRef<T>>): Ref<UnwrapRef<T> | undefined>;
export function useObservable<T>(factory: Factory<UnwrapRef<T>>, initialValue: T): Ref<UnwrapRef<T>>;
export function useObservable<T, I extends RefArray>(
  factory: FactoryWithInputs<UnwrapRef<T>, I>,
  initialValue: T,
  inputs: I,
): Ref<UnwrapRef<T>>;
export function useObservable<T, I extends RefArray>(
  factory: Factory<UnwrapRef<T>> | FactoryWithInputs<UnwrapRef<T>, I>,
  initialValue?: T,
  inputs?: I,
): Ref<UnwrapRef<T> | undefined> {
  const value = ref(typeof initialValue === 'undefined' ? undefined : initialValue);
  const value$ = new BehaviorSubject(value.value);
  const inputs$ = new BehaviorSubject(inputs);

  if (inputs) {
    watchEffect(() => {
      inputs$.next(inputs);
    });
  }

  watchEffect((onInvalidate) => {
    let output$: Observable<UnwrapRef<T>>;

    if (inputs) {
      output$ = factory(value$ as Observable<UnwrapRef<T>>, inputs$ as Observable<I>);
    } else {
      output$ = (factory as Factory<UnwrapRef<T>>)(value$ as Observable<UnwrapRef<T>>);
    }

    const subscription = output$.subscribe((val) => {
      value$.next(val);
      value.value = val;
    });

    onInvalidate(() => {
      subscription.unsubscribe();
      value$.complete();
      inputs$.complete();
    });
  });

  return value;
}
