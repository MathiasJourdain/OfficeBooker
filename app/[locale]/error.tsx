"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-red-700">Une erreur est survenue</h2>
        <p className="text-sm text-gray-700 mt-2">
          {error.message || "Impossible d'afficher cette page pour le moment."}
        </p>
        <div className="mt-4 flex gap-3">
          <Button onClick={reset} className="bg-slate-900 hover:bg-slate-800">
            Réessayer
          </Button>
        </div>
      </div>
    </div>
  )
}
