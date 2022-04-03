import { Observable, Subject, Subscription } from "rxjs";

export type ObservableProps = {
    [propName: string]:
      | Observable<unknown>
      | (() => Observable<unknown>)
      | unknown;
  };

type StoreSubscriptions<TStore> = {
    [Property in keyof TStore]: Subscription
}

type Setter<TStore> = (data: TStore) => void

type StoreObject<TStore> = {
    rawStore: ObservableProps,
    storeValues: TStore,
    previousValues: { [storeId: string]: TStore },
    subscriptions: StoreSubscriptions<TStore>,
    setters: Setter<TStore>[],
    isStatic: boolean,
    subjects?: { [storeId: string]: Subject<TStore> },
}

export type Stores = {
    [storeName: string]: StoreObject<any>;
};