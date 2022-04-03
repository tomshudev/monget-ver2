import { unstable_subscribeToStore } from "../helpers/unstable_subscribeToStore";
import { stores } from "../stores";
import { ObservableProps } from "../types";

export function unstable_createStore<TStore extends ObservableProps>(
    storeName: string,
    store: TStore,
    isStatic: boolean = false
  ): void {
    if (stores[storeName]) {
      throw `There is already a store with the name  ${storeName}`
    }

    stores[storeName] = {
        rawStore: store,
        subscriptions: {},
        setters: [],
        storeValues: {},
        previousValues: {},
        subjects: {},
        isStatic
    }
  }