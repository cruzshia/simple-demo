import { get } from './http'
import { FarmPoolsJsonFile } from '@raydium-io/raydium-sdk'
export const fetchFarmsAjax = () => get<FarmPoolsJsonFile>('v2/sdk/farm-v2/mainnet.json')
