import { stores } from "../stores";

export const useValidateStoreExistence: (storeName: string) => void = (
  storeName
) => {
  if (!stores[storeName]) {
    throw `Can't find a store with the name ${storeName}`;
  }
};
