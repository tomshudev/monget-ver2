import { handleProp } from "../actions/handlePropUpdates";
import { stores } from "../stores";
import { updateAllComponnets } from "./updateAllComponents";

export const subscribeToStore = (reqKeysObj: any, storeName: string) => {
  const values: any = {};
  const isStaticStore = stores[storeName].isStatic
  for (const [key, newValue] of Object.entries(stores[storeName].rawStore)) {
    if (!isStaticStore && reqKeysObj && reqKeysObj[key] === undefined) {
      continue;
    }

    values[key] = handleProp(storeName, key, newValue)
  }

  updateAllComponnets(storeName, isStaticStore, values);
};
