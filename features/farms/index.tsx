import useFarmStore from './store/useFarmStore'
import FarmItem from './components/FarmItem'

export default function Farm() {
  const farms = useFarmStore((s) => s.farms)
  return (
    <>
      {farms.map((farm) => (
        <FarmItem key={farm.id} />
      ))}
    </>
  )
}
