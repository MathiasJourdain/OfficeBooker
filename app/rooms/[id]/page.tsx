import { createClient } from '@/utils/supabase/server';
import { bookRoom } from './actions';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Récupérer la salle
  const { data: room } = await supabase.from('rooms').select('*').eq('id', id).single();

  if (!room) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Image */}
        <div className="md:w-1/2 relative min-h-[300px] bg-gray-200">
           {room.image_url && (
             <img src={room.image_url} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />
           )}
           <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 text-white w-full">
             <h1 className="text-2xl font-bold">{room.name}</h1>
             <p>Capacité : {room.capacity} pers.</p>
           </div>
        </div>

        {/* Formulaire */}
        <div className="md:w-1/2 p-6">
          <CardHeader>
            <CardTitle>Réserver un créneau</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={bookRoom} className="space-y-4">
              <input type="hidden" name="roomId" value={room.id} />
              
              <div>
                <label className="text-sm font-medium">Début</label>
                <Input type="datetime-local" name="startTime" required />
              </div>

              <div>
                <label className="text-sm font-medium">Fin</label>
                <Input type="datetime-local" name="endTime" required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Confirmer la réservation
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}