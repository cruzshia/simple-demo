import { FC, PropsWithChildren } from 'react'
import CommonNotification from './CommonNotification'

const Layout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <>
      {children}
      <CommonNotification />
    </>
  )
}

export default Layout
