import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ bookingSuccess?: string; error?: string }>;
}) {
  // 1. Récupération des paramètres d'URL (Next.js 15 demande un await)
  const params = await searchParams;
  const showSuccessPopup = params.bookingSuccess === 'true';
  const errorMessage = params.error;

  // 2. Connexion à Supabase et récupération des salles
  const supabase = await createClient();
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .order('id');

  if (error) {
    console.error("Erreur chargement salles:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50 relative">
      
      {/* --- POPUP DE SUCCÈS (Vert) --- */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center space-y-6 relative">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h2>
              <p className="text-gray-500">
                Votre créneau a bien été enregistré. Vous pouvez le retrouver dans votre espace personnel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">Fermer</Button>
              </Link>
              <Link href="/my-bookings" className="w-full sm:w-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Voir mes réservations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP D'ERREUR (Rouge - Ex: Doublon) --- */}
      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center space-y-6 relative border-2 border-red-50">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Oups, problème !</h2>
              <p className="text-gray-600 font-medium">
                {errorMessage}
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link href="/" className="w-full">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  J'ai compris, je change de date
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="max-w-6xl mx-auto p-8">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b pb-4">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur OfficeBooker</h1>
             <p className="text-gray-500 mt-2">Réservez l'espace idéal pour vos réunions.</p>
           </div>
           <span className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full text-gray-700">
             {rooms?.length || 0} salles disponibles
           </span>
        </div>
        
        {/* Grille des Salles */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms?.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full">
                
                {/* Image */}
                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                  {room.image_url ? (
                    <img 
                      src={room.image_url} 
                      alt={room.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
                      <span className="text-sm">Image non disponible</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                    👥 {room.capacity}
                  </div>
                </div>
                
                {/* Contenu Carte */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  
                  {/* Équipements */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.equipment?.slice(0, 4).map((item: string, index: number) => (
                      <span key={index} className="text-[10px] uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md font-semibold border border-blue-100">
                        {item}
                      </span>
                    ))}
                    {room.equipment && room.equipment.length > 4 && (
                      <span className="text-[10px] text-gray-500 px-2 py-1">+ {room.equipment.length - 4}</span>
                    )}
                  </div>

                  {/* Bouton Action */}
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link href={`/rooms/${room.id}`} className="w-full block">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all">
                        Voir le planning & Réserver
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* État vide */}
          {(!rooms || rooms.length === 0) && (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mt-8">
               <p className="text-gray-500 text-lg">Aucune salle trouvée.</p>
               <p className="text-sm text-gray-400 mt-2">Vérifiez que votre base de données Supabase contient des données.</p>
             </div>
          )}
        </section>
      </div>
    </main>
  );
}