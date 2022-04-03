import { useEffect, useLayoutEffect, useRef } from "react"
import { Subject } from "rxjs"
import { stores } from "../stores"

export const useStoreSubject = (storeName: string, storeId: string) => {
    const subjectRef = useRef<Subject<any>>()
    useLayoutEffect(() => {
        stores[storeName].subjects![storeId] = new Subject()
        subjectRef.current = stores[storeName].subjects![storeId]
    }, [storeName, storeId])

    return subjectRef
}