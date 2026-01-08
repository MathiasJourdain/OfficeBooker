// app/my-bookings/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cancelBooking } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Trash2 } from 'lucide-react';

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  // 1. Récupérer l'utilisateur courant
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Récupérer ses réservations avec les détails de la salle
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, rooms(*)')
    .eq('user_id', user?.id)
    .order('start_time', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Nouvelle réservation
            </Button>
          </Link>
        </div>

        {/* Message de succès après une réservation */}
        {params.success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 border border-green-200 flex items-center shadow-sm">
            ✅ Votre réservation a été confirmée avec succès !
          </div>
        )}

        <div className="space-y-4">
          {bookings?.map((booking) => (
            <Card key={booking.id} className="overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition">
              {/* Image de la salle */}
              <div className="sm:w-48 h-32 sm:h-auto bg-gray-200 relative">
                {booking.rooms?.image_url ? (
                  <img 
                    src={booking.rooms.image_url} 
                    alt="Salle" 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>
              
              {/* Détails */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{booking.rooms?.name || 'Salle inconnue'}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                    <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.start_time).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <Clock className="w-4 h-4" />
                      {new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                      {' - '}
                      {new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  {/* Bouton Annuler (DELETE) */}
                  <form action={cancelBooking}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Annuler
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}

          {(!bookings || bookings.length === 0) && (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">Vous n'avez aucune réservation à venir.</p>
              <Link href="/">
                <Button variant="outline">Réserver une salle</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}