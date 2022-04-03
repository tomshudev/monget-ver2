import { useEffect } from "react";
import { unstable_subscribeToStore } from "../helpers/unstable_subscribeToStore";
import { stores } from "../stores";

export const useSubscribeToStores = () => {
  useEffect(() => {
    Object.keys(stores).forEach((storeName) => {
        if (stores[storeName].isStatic) {
            unstable_subscribeToStore(storeName)
        }
      });

    return () => {
      console.log("destroyed");
      Object.values(stores).forEach((store) => {
        Object.values(store.subscriptions).forEach((subscription) =>
          subscription.unsubscribe()
        );
      });
    };
  }, []);
};
