import { stores } from "../stores";
import { ObservableProps } from "../types";

export function createStore<TStore extends ObservableProps>(
    storeName: string,
    store: TStore
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
        isStatic: false
    }
  }