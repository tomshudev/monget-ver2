import { Observable } from "rxjs";
import { useValidateStoreExistence } from "../hooks/useValidateStoreExistence";
import { stores } from "../stores";
import { handleProp } from "./handlePropUpdates";

export function updateStateProp<TStore extends Object>(
  storeName: string,
  propName: keyof TStore,
  newValue: Observable<unknown> | unknown
) {
  useValidateStoreExistence(storeName);

  if (stores[storeName].subscriptions[propName as string]) {
    stores[storeName].subscriptions[propName as string].unsubscribe();
  }

  handleProp(storeName, propName as string, newValue);
}
