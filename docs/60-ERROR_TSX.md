# Bonus : gestion d’erreurs Next.js avec `error.tsx` + ErrorBoundary React

## Pourquoi ?
Critère bonus : “les cas de chargement sont doublés d’une gestion d’erreur”.

## Principe
Next.js capture les erreurs runtime d’un segment et affiche le `error.tsx` correspondant.
Le composant reçoit :
- `error` (Error)
- `reset()` pour réessayer (oblige `"use client"`)

## Pourquoi ajouter aussi un ErrorBoundary React ?
Pour montrer qu’on connaît **les deux approches** :
- `error.tsx` : boundary “Next.js” au niveau **route/segment**
- `ErrorBoundary` : boundary “React” au niveau **composant** (utile pour isoler une section)

## Où on l’a mis
- Global : `app/error.tsx`
- Salle : `app/rooms/[id]/error.tsx`
- Mes réservations : `app/my-bookings/error.tsx`
- Ajouter salle : `app/rooms/add/error.tsx`

## Question du prof : “Pourquoi `use client` ici ?”
Parce qu’on utilise `reset()` (fonction interactive), donc composant client obligatoire.

## ErrorBoundary React (composant)
- `app/_components/ErrorBoundary.tsx`
- Utilisé autour des sections Suspense :
  - `app/rooms/[id]/page.tsx`
  - `app/my-bookings/page.tsx`
