import { Skeleton } from "@/components/ui/skeleton"

export function HomeSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        
        {/* Header (Titre + Boutons) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b pb-4">
          <div className="space-y-3">
            {/* Titre */}
            <Skeleton className="h-10 w-64" />
            {/* Sous-titre */}
            <Skeleton className="h-5 w-48" />
          </div>
          
          <div className="flex items-center gap-3">
            {/* Badge compteur */}
            <Skeleton className="h-8 w-32 rounded-full" />
            {/* Bouton Ajouter */}
            <Skeleton className="h-9 w-36" />
          </div>
        </div>

        {/* Grille des Salles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* On génère 6 fausses cartes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
              
              {/* Image de la salle */}
              <Skeleton className="h-56 w-full rounded-none" />
              
              <div className="p-6 flex-1 flex flex-col space-y-4">
                {/* Nom de la salle */}
                <Skeleton className="h-7 w-3/4" />
                
                {/* Équipements (petits badges) */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>

                {/* Bouton du bas */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}