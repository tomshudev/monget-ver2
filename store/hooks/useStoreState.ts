import { useLayoutEffect, useState } from "react";
import { getMappedRequirements } from "../helpers/getMappedValues";
import { subscribeToStore } from "../helpers/subscribeToStore";
import { unsubscribeFromStore } from "../helpers/unsubscribeFromStore";
import { stores } from "../stores";
import { useStoreSetter } from "./useStoreSetter";
import { useValidateStoreExistence } from "./useValidateStoreExistence";
import {v4 as uuid} from 'uuid'

export function useStoreState<TStore extends Object>(
    storeName: string,
    reqKeys?: (keyof TStore)[]
  ): { [Property in keyof TStore]?: unknown } {
    useValidateStoreExistence(storeName);
    const [state, setState] = useState<{ [Property in keyof TStore]?: unknown }>(
      {}
    );
    const [storeId, _] = useState(uuid())
  
    let reqKeysObj = getMappedRequirements(reqKeys);
    const setter = useStoreSetter(storeName, storeId, setState, reqKeys as string[])
  
    useLayoutEffect(() => {
      stores[storeName].setters.push(setter);
      subscribeToStore(reqKeysObj, storeName);
  
      return unsubscribeFromStore(storeName)
    }, []);
  
    return state;
  }