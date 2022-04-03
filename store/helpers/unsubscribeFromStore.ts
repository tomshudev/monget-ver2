import { stores } from "../stores";

export const unsubscribeFromStore = (storeName: string) => () => {
  Object.values(stores[storeName].subscriptions).forEach((sub) => {
    sub.unsubscribe();
  });
};
