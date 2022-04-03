import { stores } from "../stores";

export const unstable_updateAllComponnets = (storeName: string, newStore: any) => {
    if (stores[storeName].isStatic) {
        Object.values(stores[storeName].subjects!).forEach((subject) => subject.next(newStore));
    } else {
        stores[storeName].setters.forEach((setter) => setter(newStore));
    }
  };