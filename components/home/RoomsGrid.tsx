import { RoomCard } from "./RoomCard"

export function RoomsGrid({ rooms }: { rooms?: any[] }) {
  if (!rooms || rooms.length === 0) {
    return <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">Aucune salle trouvée.</div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
    </div>
  )
}
