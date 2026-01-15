# Architecture des dossiers (convention du cours)

## Idée générale
On range les fichiers “par feature” dans `app/...` et on sépare :
- `_components` : UI (petits composants)
- `_hooks/queries` : lecture de données (GET) via TanStack Query
- `_hooks/mutations` : écriture de données (POST/PUT/DELETE) via TanStack Query

## Exemples concrets dans ce projet

### Ajout de salle
- UI: `app/rooms/add/_components/RoomForm.tsx`
- Form: `app/rooms/add/_hooks/useRoomForm.ts`
- Mutation: `app/rooms/add/_hooks/mutations/usePostRoomMutation.ts`

### Lecture salles
- Hook query: `app/_hooks/queries/useRoomsSuspenseQuery.ts`
- Composant: `app/_components/RoomsList.tsx`

## Ce que ça prouve à l’évaluation
- Fichiers rangés “logiquement” (critère explicite)
- Responsabilité simple par fichier

