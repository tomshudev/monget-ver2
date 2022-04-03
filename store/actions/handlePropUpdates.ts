import { isObservable, Observable } from "rxjs";
import { updateAllComponnets } from "../helpers/updateAllComponents";
import { stores } from "../stores";

export function updateState(
  storeName: string,
  propName: string,
  value: unknown
) {
  const oldStore = stores[storeName].storeValues;
  const newStore = {
    ...stores[storeName].storeValues,
    [propName]: value,
  };

  // Merging the stores for a case where a prop was updated in the global store
  // before the new store got the change
  const mergedStore = { ...oldStore, ...newStore };
  stores[storeName].storeValues = mergedStore;

  updateAllComponnets(storeName, stores[storeName].isStatic,  mergedStore);
}

export function handleProp(
  storeName: string,
  propName: string,
  value: Observable<unknown> | unknown
): unknown {
  let returnValue = undefined;

  if (!isObservable(value)) {
    updateState(storeName, propName as string, value);
    returnValue = value;
  } else {
    const subscription = (value as Observable<unknown>).subscribe({
      next: (value) => {
        updateState(storeName, propName as string, value);
      },
    });

    stores[storeName].subscriptions[propName] = subscription;
  }

  return returnValue;
}
