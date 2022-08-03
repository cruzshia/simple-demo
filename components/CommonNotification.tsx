import { ReactNode, useEffect } from 'react'
import { Subject } from 'rxjs'

export const notifySubject = new Subject<{ type: 'info' | 'error'; message: ReactNode }>()

export default function CommonNotification() {
  useEffect(() => {
    const sub = notifySubject.asObservable().subscribe((data) => {
      console.log(data)
    })

    return () => sub.unsubscribe()
  }, [])
  return null
}
