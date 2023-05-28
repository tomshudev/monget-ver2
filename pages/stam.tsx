import { useEffect } from 'react'
import { interval, map, tap } from 'rxjs'
import { unstable_createStore } from '../store/actions/unstable_createStore'
import { unstable_updateStateProp } from '../store/actions/unstable_updateStateProp'
import { unstable_useStoreState } from '../store/hooks/unstable_useStoreState'

export const TOM_STORE = 'tom'

unstable_createStore(
  TOM_STORE,
  {
    num: [0],
    clock: interval(1000).pipe(
      map(() => {
        const curr = new Date()
        return `${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}`
      }),
      tap(() => console.log('what'))
    ),
  },
  true
)

function Stam() {
  console.log('render stam')

  const { num } = unstable_useStoreState(TOM_STORE, ['num'])

  useEffect(() => {
    let newNum = 0
    let array = [newNum]
    setInterval(() => {
      newNum += 1
      array.push(newNum)
      //   unstable_updateStateProp(TOM_STORE, "num", [...array].join(','));
    }, 2000)

    // setTimeout(() => {
    //   updateStateProp<MyAppStore>("MyApp", "clock", "THIS IS THE NEW CLOCKK");
    // }, 5000);
  }, [])

  return (
    <div>
      {/* <a href="/">Home</a> */}
      <h1>{(num as number) || 'No num'}</h1>
    </div>
  )
}

export default Stam
