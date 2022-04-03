// import "../../styles/globals.css";
import type { AppProps } from "next/app";
// import { createStore, updateStateProp, useStoreState } from "../store/store";
import {
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  Observable,
  switchMap,
  tap,
} from "rxjs";
import { useEffect } from "react";
import { createStore } from "../../store/actions/createStore";
import { useStoreState } from "../../store/hooks/useStoreState";
import { updateStateProp } from "../../store/actions/updateStateProp";
import { unstable_createStore } from "../../store/actions/unstable_createStore";

export const TOM_STORE = 'tom'

unstable_createStore(TOM_STORE, {
    num: 50,
    clock: interval(1000).pipe(
        map(() => {
          const curr = new Date();
          return `${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}`;
        })
      ),
})

// createStore("MyApp", {
//   hello: 25,
//   clock: interval(1000).pipe(
//     map(() => {
//       const curr = new Date();
//       return `${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}`;
//     })
//   ),
//   mouseMovement: from("hello").pipe(tap(console.log)),
//   data: from(fetch("https://jsonplaceholder.typicode.com/posts")).pipe(
//     switchMap((res) => from(res.json()))
//   ),
// });

type NewStore = {
  galName: string;
  stam: Observable<number>;
};

type Stam = {
  what: Observable<unknown>;
};

// createStore<NewStore>("newStore", {
//   galName: "what",
//   stam: interval().pipe(mapTo(5)),
// });

type MyAppStore = {
  hello: number;
  clock: Observable<string>;
  mouseMovement: Observable<unknown>;
  data: Observable<Object>;
};

const Clock = () => {
  const {clock} = useStoreState<MyAppStore>('MyApp', ["clock"])

  useEffect(() => {
    console.log('rendered Clock', clock)
  })

  return (
    <h1>{clock as string ?? 'Clock is loading'}</h1>
  )
}

const Number = () => {
  const {hello} = useStoreState<MyAppStore>('MyApp', ["hello"])

  useEffect(() => {
    console.log('rendered Number', hello)
  })

  return (
    <div>{hello as number}</div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  // const { hello, clock, data } = useStoreState<MyAppStore>("MyApp", [
  //   "hello",
  //   "clock",
  //   "data"
  // ]);

  let num: number

  console.log('rendering app')

  useEffect(() => {
    num = 0
    setInterval(() => {
      num += 2;
      updateStateProp<MyAppStore>("MyApp", "hello", num);
    }, 2000);

    // setTimeout(() => {
    //   updateStateProp<MyAppStore>("MyApp", "clock", "THIS IS THE NEW CLOCKK");
    // }, 5000);
  }, []);

  return (
    <div>
      {/* <h1>Number: {hello}</h1> */}
      {/* <h2>Clock: {clock ?? "Waiting for clock"}</h2> */}
      {/* <Number />
      <Clock /> */}
    </div>
  );
}

export default MyApp;
