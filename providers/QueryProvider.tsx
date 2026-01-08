'use client' // 👈 Très important

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // On crée le client une seule fois par session
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Les données restent "fraîches" 1 minute avant de redemander au serveur
        staleTime: 60 * 1000, 
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Petit bouton fleur en bas à droite pour débugger (visible seulement en dev) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}