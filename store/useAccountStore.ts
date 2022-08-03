import create from 'zustand'
import { Connection } from '@solana/web3.js'
import { WalletContextState } from '@solana/wallet-adapter-react'

interface AccountStore {
  connection?: Connection
  wallet?: WalletContextState
}

const useAccountStore = create<AccountStore>((set, get) => ({}))
export default useAccountStore
