# Flux de données : Ajouter une salle (le plus important)

## Point de départ
- **Page**: `app/rooms/add/page.tsx`
- **Composant client**: `app/rooms/add/_components/RoomForm.tsx`

## Étapes (de l’UI jusqu’à Supabase)
1. **L’utilisateur remplit** les champs (nom, capacité, équipements, image).
2. **Submit** → `<form onSubmit={handleSubmit(onSubmit)} />` dans `RoomForm.tsx`.
3. `handleSubmit` (react-hook-form) **valide** via Zod (hook `useRoomForm`).
4. Si OK → `onSubmit(data)` construit un `payload` (notamment `equipment` en tableau).
5. `usePostRoomMutation` lance un **POST HTTP** vers `POST /api/rooms`.
6. **API route** `app/api/rooms/route.ts` :
   - Vérifie la session Supabase (user connecté)
   - Insert dans la table `rooms`
7. **Supabase** applique ses règles (RLS). Si politique manquante → erreur RLS.
8. Si succès :
   - `invalidateQueries(["rooms"])` → TanStack Query refetch les salles (cache à jour)
   - redirection `router.push("/")` (ou page de succès selon votre choix)

## Ce que le prof peut demander
- **“Pourquoi `invalidateQueries` ?”**
  - Pour forcer le refetch de la liste des salles après création (cache cohérent).
- **“Où est l’endpoint POST ?”**
  - `app/api/rooms/route.ts` → export `POST`.

