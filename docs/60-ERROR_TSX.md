# Bonus : gestion d’erreurs Next.js avec `error.tsx`

## Pourquoi ?
Critère bonus : “les cas de chargement sont doublés d’une gestion d’erreur”.

## Principe
Next.js capture les erreurs runtime d’un segment et affiche le `error.tsx` correspondant.
Le composant reçoit :
- `error` (Error)
- `reset()` pour réessayer (oblige `"use client"`)

## Où on l’a mis
- Global : `app/error.tsx`
- Salle : `app/rooms/[id]/error.tsx`
- Mes réservations : `app/my-bookings/error.tsx`
- Ajouter salle : `app/rooms/add/error.tsx`

## Question du prof : “Pourquoi `use client` ici ?”
Parce qu’on utilise `reset()` (fonction interactive), donc composant client obligatoire.

