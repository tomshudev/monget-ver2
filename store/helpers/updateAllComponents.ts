import { stores } from "../stores";

export const updateAllComponnets = (
  storeName: string,
  isStaticStore: boolean,
  newStore: any
) => {
  if (isStaticStore) {
    Object.values(stores[storeName].subjects!).forEach((subject) =>
      subject.next(newStore)
    );
  } else {
    stores[storeName].setters.forEach((setter) => setter(newStore));
  }
};
