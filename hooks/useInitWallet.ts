import { useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import useAccountStore from '@/store/useAccountStore'

export default function useInitWallet() {
  const wallet = useWallet()
  const { connection } = useConnection()
  useEffect(() => {
    useAccountStore.setState({
      connection,
      wallet
    })
  }, [connection, wallet])

  return null
}
