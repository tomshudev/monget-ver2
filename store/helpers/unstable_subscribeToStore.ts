import { unstable_handleProp } from "../actions/unstable_handlePropUpdate";
import { stores } from "../stores";
import { unstable_updateAllComponnets } from "./unstable_updateAllComponents";

export const unstable_subscribeToStore = (storeName: string) => {
  const values: any = {};
  for (const [key, newValue] of Object.entries(stores[storeName].rawStore)) {
    values[key] = unstable_handleProp(storeName, key, newValue)
  }

  unstable_updateAllComponnets(storeName, values);
};
