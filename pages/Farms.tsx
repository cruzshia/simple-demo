import { useEffect } from 'react'
import useFarmStore from '@/features/farms/store/useFarmStore'
import FarmsHome from '@/features/farms'

export default function Farms() {
  const { fetchFarms } = useFarmStore()
  useEffect(() => {
    fetchFarms()
  }, [fetchFarms])

  return <FarmsHome />
}
