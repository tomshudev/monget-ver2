import { useCallback } from "react";
import { stores } from "../stores";
import _ from 'lodash'

export const useStoreSetter = (storeName: string, storeId: string, setState: (data: any) => void, reqKeys: string[]) => {
    const setter = useCallback(newStore => {
        // Checking if there was a change between the new state and
        // the previous state the component got
        const filteredCurrentState = _.pick(stores[storeName].previousValues[storeId], ...reqKeys)
        const filterdNewStore = _.pick(newStore, ...reqKeys)
        if (!_.isEqual(filterdNewStore, filteredCurrentState)) {
          // Returning only the properties the user requested
          setState(filterdNewStore);
        }

        // Storing the current state in order to check if there were
        // changes for the state of the component
        stores[storeName].previousValues[storeId] = {...filterdNewStore}
      }, [setState])

    return setter;
}