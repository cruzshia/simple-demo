import create from 'zustand'
import { Trade, RouteInfo, RouteType, TokenAmount, Token } from '@raydium-io/raydium-sdk'
import useAccountStore from '@/store/useAccountStore'
import { notifySubject } from '@/components/CommonNotification'
import { object, string, array } from 'yup'

interface SwapStore {
  coin1Amount?: string
  coin2Amount?: string
  routes: RouteInfo[]
  routeType?: RouteType
  swapTokenTx: () => Promise<any>
}

const swapSchema = object().shape({
  coin1Amount: string().required('coin 1 must have'),
  coin2Amount: string().required('coin 2 must have'),
  publicKey: string().required('wallet needed'),
  routes: array().min(1).required(),
  routeType: string().required(),
  connection: object().required()
})

export const useSwapStore = create<SwapStore>((set, get) => ({
  routes: [],
  swapTokenTx: async () => {
    const { routes, routeType, coin1Amount, coin2Amount } = get()

    try {
      const res = await swapSchema.validate({
        connection: useAccountStore.getState().connection,
        publicKey: useAccountStore.getState().wallet?.publicKey,
        routes,
        routeType,
        coin1Amount,
        coin2Amount
      })

      const { setupTransaction, tradeTransaction } = await Trade.makeTradeTransaction({
        connection: useAccountStore.getState().connection!,
        routes: routes,
        routeType: routeType!,
        fixedSide: 'in',
        userKeys: {
          tokenAccounts: [],
          owner: useAccountStore.getState().wallet?.publicKey!
        },
        amountIn: new TokenAmount(new Token('0x123', 10, 'SOL', 'SOL'), coin1Amount),
        amountOut: new TokenAmount(new Token('0x123', 10, 'WSOL', 'WSOL'), coin2Amount)
      })

      notifySubject.next({
        type: 'info',
        message: 'tx success'
      })
    } catch {
      notifySubject.next({
        type: 'error',
        message: 'tx failed'
      })
    }
  }
}))
