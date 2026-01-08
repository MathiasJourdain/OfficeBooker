export function RoomImage({ room }: { room: any }) {
  return (
    <div className="md:w-1/2 relative min-h-[300px] bg-gray-200">
      {room.image_url && <img src={room.image_url} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 text-white w-full">
        <h1 className="text-2xl font-bold">{room.name}</h1>
        <p>Capacité : {room.capacity} pers.</p>
      </div>
    </div>
  )
}
