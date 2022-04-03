import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getMappedRequirements } from "../helpers/getMappedValues";
import { subscribeToStore } from "../helpers/subscribeToStore";
import { unsubscribeFromStore } from "../helpers/unsubscribeFromStore";
import { stores } from "../stores";
import { useStoreSetter } from "./useStoreSetter";
import { useValidateStoreExistence } from "./useValidateStoreExistence";
import { v4 as uuid } from "uuid";
import { useStoreSubject } from "./unstable_useStoreSubject";
import { unstable_useStoreSetter } from "./unstable_useStoreSetter";

export function unstable_useStoreState<TStore extends Object>(
  storeName: string,
  reqKeys?: (keyof TStore)[]
): { [Property in keyof TStore]?: unknown } {
  useValidateStoreExistence(storeName);
  const [state, setState] = useState<{ [Property in keyof TStore]?: unknown }>(
    stores[storeName].storeValues
  );
  const [storeId, _] = useState(uuid());

  const subjectRef = useStoreSubject(storeName, storeId);
  const setter = useStoreSetter(
    storeName,
    storeId,
    setState,
    reqKeys as string[]
  );

  useLayoutEffect(() => {
    if (stores[storeName].isStatic) {
      const subscription = subjectRef.current!.subscribe({
        next: (store: TStore) => {
          setter(store);
        },
      });

      return () => subscription.unsubscribe();
    } else {
      let reqKeysObj = getMappedRequirements(reqKeys);
      stores[storeName].setters.push(setter);
      subscribeToStore(reqKeysObj, storeName);

      return unsubscribeFromStore(storeName);
    }
  }, []);

  return state;
}
