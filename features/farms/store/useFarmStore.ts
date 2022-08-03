import create from 'zustand'
import { FarmPoolJsonInfoV1, FarmPoolsJsonFile } from '@raydium-io/raydium-sdk'
import { fetchFarmsAjax } from '@/api/services'

interface FarmStore {
  farms: FarmPoolJsonInfoV1[]
  fetchFarms: () => Promise<void>
}

const useFarmStore = create<FarmStore>((set, get) => ({
  farms: [],
  fetchFarms: async () => {
    const { data } = await fetchFarmsAjax()
    if (!data) return undefined
    set({
      farms: data.official
    })
  }
}))

export default useFarmStore
